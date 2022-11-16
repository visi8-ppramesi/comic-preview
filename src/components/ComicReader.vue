<template>
    <div ref="imageContainer" class="w-full bg-black flex justify-center justify-items-center content-center items-center">
        <div 
            class="w-full relative overflow-hidden"
            :style="{
                '--overlay-height': olayHeight,
                '--overlay-width': olayWidth,
                '--overlay-x': olayX,
                '--overlay-y': olayY
            }"
        >
            <template v-if="isLink">
                <!--<span class="right-2 left-2"></span>-->
                <div v-if="detectMobile() && canRunAr" :class="arButtonPos" class="z-20 w-14 h-10 border-2 border-black bg-gray-200 bg-opacity-75 flex justify-center items-center rounded-md absolute top-2">
                    <router-link :to="arLink">
                        <img class="w-full" :src="arLogo" />
                    </router-link>
                </div>
            </template>
            <template v-else>
                <component v-if="extraComponent" :is="extraComponent"></component>
            </template>
            <div :class="{'my-opaque': showOverlay, 'my-transparent': !showOverlay}" class="holed-overlay"></div>
            <img ref="imageElement" :src="source" class="image content w-full min-h-20" @load="initializeReader" />
            <toolbar
                v-if="viewerPoints.length > 0 && readerOn"
                class="absolute left-0 right-0 bottom-2 mx-auto z-30" 
                @back="back"
                @up="up" 
                @forward="forward"
            />
        </div>
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import Page from '../firebase/comics/Page.js'
// import VideoOverlay from '../asyncComponents/VideoOverlay.vue'
// import _ from 'lodash'
import size from 'lodash/size'
import once from 'lodash/once'
import isEmpty from 'lodash/isEmpty'
import { doc, getDoc } from 'firebase/firestore'
import fb from '@/firebase/firebase.js'
import Toolbar from './Toolbar.vue'
import isEqual from 'lodash/isEqual'
export default {
    components: {
        Toolbar
    },
    name: 'comic-reader',
    inject: ['routeResolver', 'detectMobile', 'canRunAr'],
    props: {
        pageObj: {
            type: Page
        },
        pageId: {
            type: String
        },
        chapterId: {
            type: String,
            default: () => ''
        },
        arLink: {
            type: Object,
            default: () => ({})
        },
        linkType: {
            type: String,
            default: 'gspath'
        },
        asyncComponent: {
            type: String,
            default : ''
        },
        link: String,
        idx: Number,
        linkTo: {
            type: Object,
            default: () => ({})
        },
        viewerPoints: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        isLink(){
            return size(this.arLink) > 0
            // return !isEmpty(this.linkTo)
        },
        arButtonPos(){
            const arPos = this.pageObj.config?.ar_button_pos || 'left'
            return `${arPos}-2`
        }
    },
    data(){
        return {
            arLogo: require('@/assets/icons/ar_icon.svg'),
            source: null,
            showGlow: false,
            extraComponent: null,
            scrollEventListener: null,
            showOverlay: false,
            origWidth: 0,
            origHeight: 0,
            viewerIndex: 0,
            viewportStartY: null,
            viewportStartX: null,
            viewportEndY: null,
            viewportEndX: null,
            imgEndWidth: null,
            imgEndHeight: null,
            viewportActualWidth: null,
            viewportActualHeight: null,
            olayHeight: '10px',
            olayWidth: '10px',
            olayX: '0px',
            olayY: '0px',
            laps: 0,
            readerOn: false,
            doneReadingEvent: null,
            currentZoomSettings: {
                zoom: 1, x: 50, y: 50
            },
            mql: null
        }
    },
    mounted(){
        this.logger(this.viewerPoints)
        if(!isEmpty(this.asyncComponent)){
            const self = this
            const fetcherFunc = async function(){
                const docRef = doc(fb.db, 'async_components', self.asyncComponent)
                const snap = await getDoc(docRef)
                const data = snap.data()
                return data
            }
            this.extraComponent = this.asyncComponentLoader(fetcherFunc)
        }
        this.mql = window.matchMedia("(orientation: portrait)")
        this.mql.addEventListener('change', this.orientationChange)

        this.doneReadingEvent = new Event('done-reading')
    },
    beforeUnmount(){
        this.mql.removeEventListener('change', this.orientationChange)
    },
    methods: {
        orientationChange(){
            this.$nextTick(() => {
                this.up()
                this.initializeReader()
            })
            // var afterOrientationChange = () => {
            //     this.$nextTick(() => {
            //         this.up()
            //         this.initializeReader()
            //     })
            //     window.removeEventListener('resize', afterOrientationChange);
            // };
            // window.addEventListener('resize', afterOrientationChange);
        },
        getScreenRatio(){
            const windowHeight = window.innerHeight
            const windowWidth = window.innerWidth
            return windowHeight / windowWidth
        },
        viewerZoom(viewerData){
            // const viewerData = this.viewerPoints[this.viewerIndex];
            const zoom = (viewerData.zoom)
            const origin = this.getOrigin(viewerData.x / 100, viewerData.y / 100, zoom)

            const zoomSettings = {
                zoom, 
                x: Math.round(origin[0] * 100),
                y: Math.round(origin[1] * 100)
            }
            if(viewerData?.overlay){
                zoomSettings.overlay = {}
                zoomSettings.overlay.height = ((viewerData.overlay.height / 100) * this.viewportActualHeight) + 'px'
                zoomSettings.overlay.width = ((viewerData.overlay.width / 100) * this.viewportActualWidth) + 'px'
                zoomSettings.overlay.x = ((viewerData.overlay.x / 100) * this.viewportActualWidth) + 'px'
                zoomSettings.overlay.y = ((viewerData.overlay.y / 100) * this.viewportActualHeight) + 'px'
            }
            if(isEqual(this.currentZoomSettings, zoomSettings)){
                return
            }

            this.$refs.imageElement.style.transformOrigin = `${zoomSettings.x}% ${zoomSettings.y}%`;
            this.$refs.imageElement.style.transform = `scale(${zoomSettings.zoom})`;
            this.$refs.imageElement.style.webkitTransform = `scale(${zoomSettings.zoom})`;
            this.$refs.imageElement.style.msTransform = `scale(${zoomSettings.zoom})`;

            if(viewerData?.overlay){
                this.showOverlay = true
                this.olayHeight = zoomSettings.overlay.height
                this.olayWidth = zoomSettings.overlay.width
                this.olayX = zoomSettings.overlay.x
                this.olayY = zoomSettings.overlay.y
            }else{
                this.showOverlay = false
            }
            this.currentZoomSettings = zoomSettings
        },
        back(){
            this.viewerIndex = (this.viewerIndex + (this.viewerPoints.length - 1)) % this.viewerPoints.length;
            this.viewerZoom(this.viewerPoints[this.viewerIndex])
        },
        up(){
            this.viewerIndex = 0
            this.viewerZoom({
                zoom: 1,
                x: 50,
                y: 50,
            })
        },
        forward(){
            this.viewerIndex = (this.viewerIndex + 1) % this.viewerPoints.length;
            if(this.viewerIndex === 0){
                this.laps += 1
            }
            if(this.laps > 0 && this.viewerIndex === 0){
                this.up()
                this.$refs.imageElement.dispatchEvent(this.doneReadingEvent)
            }else{
                this.viewerZoom(this.viewerPoints[this.viewerIndex])
            }
        },
        initializeReader(){
            this.readerOn = this.getScreenRatio() >= 1.25

            const imgStartHeight = this.$refs.imageElement.getBoundingClientRect().top
            const viewportStartHeight = this.$refs.imageElement.parentElement.getBoundingClientRect().top
            this.viewportStartY = viewportStartHeight - imgStartHeight

            const imgStartWidth = this.$refs.imageElement.getBoundingClientRect().left
            const viewportStartWidth = this.$refs.imageElement.parentElement.getBoundingClientRect().left
            this.viewportStartX = viewportStartWidth - imgStartWidth

            this.imgEndHeight = this.$refs.imageElement.getBoundingClientRect().bottom
            const viewportEndHeight = this.$refs.imageElement.parentElement.getBoundingClientRect().bottom
            this.viewportEndY = viewportEndHeight - imgStartHeight

            this.imgEndWidth = this.$refs.imageElement.getBoundingClientRect().right
            const viewportEndWidth = this.$refs.imageElement.parentElement.getBoundingClientRect().right
            this.viewportEndX = viewportEndWidth - imgStartWidth

            this.viewportActualWidth = viewportEndWidth - viewportStartWidth
            this.viewportActualHeight = viewportEndHeight - viewportStartHeight
        },
        getOrigin(givenX, givenY, zoom){
            if((Math.abs(givenX)  - 0.5) <= 0.01 && (Math.abs(givenY)  - 0.5) <= 0.01 && zoom == 1){
                return [0.5, 0.5]
            }

            const centerY = (this.viewportStartY + this.viewportEndY) / 2
            const centerX = (this.viewportStartX + this.viewportEndX) / 2

            const centerYPercent = centerY / this.viewportEndY
            const centerXPercent = centerX / this.viewportEndX

            const originY = ((givenY - centerYPercent) / (1 - (1 / zoom))) + centerYPercent
            const originX = ((givenX - centerXPercent) / (1 - (1 / zoom))) + centerXPercent

            const sanityCheckX = (originX - centerXPercent) * (1 - (1 / zoom))     
            const sanityCheckY = (originY - centerYPercent) * (1 - (1 / zoom))

            return [originX, originY, sanityCheckX, sanityCheckY]
        },
        playVideo(){
        },
        toggleVideo(){
        },
        getLoader(){
            const loader = once(() => {
                const gsTest = /^gs:\/\//
                const httpTest = /^(http|https):\/\//
                if(gsTest.test(this.link)){
                    return utils.getDataUrlFromStorage(this.link).then((dataUrl) => {
                        this.source = dataUrl
                        this.logger(this.idx + ' loaded')
                        return dataUrl
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                }else if(httpTest.test(this.link)){
                    //eslint-disable-next-line no-unused-vars
                    if(process.env.VUE_APP_DRM_ENABLED == 'true' && this.DRM){
                        let tries = 0
                        const createBlobFunction = (blobLink) => {
                            return new Promise((resolve, reject) => {
                                this.DRM.createImageBlob(blobLink, this.pageId, "image/jpeg", tries > 0).then((blobUrl) => {
                                    if(this.$refs?.imageElement){
                                        this.$refs.imageElement.onload = () => {
                                            this.DRM.revokeImageBlob(this.pageId)
                                            resolve(blobUrl)
                                        }
                                        this.$refs.imageElement.onerror = () => {
                                            tries++;
                                            if(tries < 2){
                                                this.logger('refetching image')
                                                this.pageObj.getSignedImageUrl().then((newLink) => {
                                                    createBlobFunction(newLink).then(resolve).catch(reject)
                                                })
                                            }else{
                                                reject('image fetch error')
                                            }
                                        }
                                    }
                                    this.source = blobUrl
                                    this.logger(this.idx + ' loaded')
                                }).catch((error) => {
                                    tries++;
                                    if(tries < 2){
                                        console.error(`Error; details: ${error}; retrying`)
                                        this.logger('refetching image')
                                        this.pageObj.getSignedImageUrl().then((newLink) => {
                                            createBlobFunction(newLink).then(resolve).catch(reject)
                                        })
                                    }else{
                                        reject('image fetch error')
                                        console.error(`Error; details: ${error}`)
                                    }
                                })
                            })
                        }
                        return createBlobFunction(this.link)
                        // return new Promise((resolve, reject) => {
                        //     this.DRM.createImageBlob(this.link, this.pageId, "image/jpeg", tries > 0).then((blobUrl) => {
                        //         if(this.$refs?.imageElement){
                        //             this.$refs.imageElement.onload = () => {
                        //                 this.DRM.revokeImageBlob(this.pageId)
                        //                 resolve(blobUrl)
                        //             }
                        //         }
                        //         this.source = blobUrl
                        //         this.logger(this.idx + ' loaded')
                        //     }).catch(reject)
                        // })
                    }else{
                        //eslint-disable-next-line no-unused-vars
                        return new Promise((resolve, reject) => {
                            this.source = this.link
                            this.logger(this.idx + ' loaded')

                            if(this.$refs?.imageElement){
                                this.$refs.imageElement.onload = () => {
                                    resolve(this.link)
                                }
                            }
                        })
                    }
                }
            })
            const scroller = once(() => {
                this.$refs.imageContainer.scrollIntoView({
                    behavior: 'smooth'
                });
            })

            const elem = this.$refs.imageElement

            return { loader, scroller, elem }
        }
    }
}
</script>

<style scoped>

.image{
    -webkit-transition: 1s ease-in-out;
    -moz-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
}

.holed-overlay{
    position:absolute;
    padding: var(--overlay-height) var(--overlay-width);
    box-shadow: 0 0 0 1000em rgb(0 0 0 / 70%);
    z-index: 10;
    transform: translate(var(--overlay-x), var(--overlay-y));
    border-radius: 4px;

    -webkit-transition: 1s ease-in-out;
    -moz-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
}

.my-opaque{
    opacity: 1
}

.my-transparent{
    opacity: 0
}
</style>