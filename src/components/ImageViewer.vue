<template>
    <div ref="imageContainer" class="w-full bg-black flex justify-center justify-items-center content-center items-center">
        <div class="w-full relative">
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
            <img ref="imageElement" :src="source" class="content w-full min-h-20" />
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
export default {
    name: 'image-player',
    inject: ['routeResolver', 'detectMobile', 'canRunAr'],
    components: {
        // VideoOverlay
    },
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
            scrollEventListener: null
        }
    },
    mounted(){
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
        // if(this.isLink){
        //     this.$nextTick(() => {
        //         this.handleScroll()
        //         window.addEventListener('scroll', this.handleScroll)
        //     })
        // }
    },
    beforeUnmount(){
        // window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        // handleScroll(){
        //     const imgElem = this.$refs.imageElement
        //     if(this.isInViewport(imgElem)){
        //         this.showGlow = true
        //     }else{
        //         this.showGlow = false
        //     }
        // },
        isInViewport(element){
            const rect = element.getBoundingClientRect();
            const bottom = rect.bottom < (window.innerHeight / 1.5) ? rect.bottom : rect.bottom / 1.5
            const right = rect.right - 1
            const visible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                right <= (window.innerWidth || document.documentElement.clientWidth)
            )
            return visible;
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
                        //     this.DRM.createImageBlob(this.link, this.pageId).then((blobUrl) => {
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
.glow{
    box-shadow: 0 0 15px 3px #FFF, 0 0 8px 2px #f0f, 0 0 5px 5px #0FF;
    /* width: 80.5vw; */
    z-index: 99;
    margin-bottom:2px;
    transform: scale(0.98, 0.99) !important;
    /* transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease !important; */
}
.glow-animation{
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}
.full-width{
    width: 100%;
}
</style>