<template>
    <div ref="videoContainer" class="relative bg-black flex justify-center justify-items-center content-center items-center">
        <div :class="[vidPlaying ? '' : 'vid-paused']" class="absolute z-10 video-container">
            <div v-if="detectMobile() && isLink && canRunAr" :class="[showArButton ? 'opacity-1' : 'opacity-0', arButtonPos]" class="z-20 w-14 h-10 border-2 border-black bg-gray-200 bg-opacity-75 flex justify-center items-center rounded-md absolute top-2">
                <transition name="my-fade">
                    <router-link :to="arLink">
                        <img class="w-full" :src="arLogo" />
                        <!-- <svg width="63" height="40" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="'Arimo'" font-size="40" id="svg_1" y="32.5" x="7" stroke-width="0" stroke="#000" fill="#000000">AR</text>
                            </g>
                        </svg> -->
                    </router-link>
                </transition>
            </div>
            <video
                class="video content"
                ref="videoElement"
                playsinline
                :src="source"
                preload="auto"
                :poster="poster"
                type="video/mp4">
            </video>
        </div>
        <div class="z-20">
            <div class="w-28 h-28">
                <svg v-if="vidLoaded" :class="[vidPlaying ? 'opacity-0' : 'opacity-90']" @click="toggleVideo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                    <polygon fill="#ffffff" class="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"/>
                    <path fill="#ffffff" class="play-btn__svg" d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../firebase/utils/index.js'
import Page from '../firebase/comics/Page.js'
// import _ from 'lodash'
import size from 'lodash/size'
import once from 'lodash/once'
import isNil from 'lodash/isNil'
export default {
    name: 'video-player',
    inject: [
        'detectMobile',
        'isDeviceShitty',
        'canRunAr'
    ],
    props: {
        pageObj: {
            type: Page
        },
        pageId: {
            type: String
        },
        arLink: {
            type: Object,
            default: () => ({})
        },
        showArButtonTiming: {
            type: Object,
            default: () => ({})
        },
        linkType: {
            type: String,
            default: 'gspath'
        },
        link: String,
        idx: Number
    },
    emits: ['playClicked'],
    data(){
        return {
            arLogo: require('@/assets/icons/ar_icon.svg'),
            showArButton: false,
            vidPlaying: false,
            vidLoaded: false,
            source: null,
            poster: null
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
    mounted(){
        if(size(this.showArButtonTiming) == 2){
            this.$refs.videoElement.ontimeupdate = () => {
                const time = this.$refs.videoElement.currentTime
                if(this.showArButtonTiming.start < time && time < this.showArButtonTiming.end){
                    this.showArButton = true
                }else{
                    this.showArButton = false
                }
            }
        }
        window.addEventListener('resize', () => {
            if(this.$refs?.videoContainer){
                this.$refs.videoContainer.style.height = `${this.$refs.videoElement.offsetHeight}px`
            }
        }, true);
        this.$refs.videoElement.onloadeddata = () => {
            if(this.$refs?.videoContainer){
                this.$refs.videoContainer.style.height = `${this.$refs.videoElement.offsetHeight}px`
            }
        }
        this.$refs.videoElement.addEventListener('ended', () => {
            this.vidPlaying = false
        })
    },
    methods: {
        pauseVideo(){
            this.$refs.videoElement.pause()
            this.vidPlaying = false
        },
        playVideo(){
            this.DRM.revokeImageBlob(this.pageId)
            this.$refs.videoElement.play()
            this.vidPlaying = true
            this.$emit('playClicked', this.idx)
        },
        toggleVideo(){
            if(this.vidPlaying){
                this.$refs.videoElement.pause()
                this.vidPlaying = false
            }else{
                this.$refs.videoElement.play()
                this.vidPlaying = true
                this.$emit('playClicked', this.idx)
            }
        },
        getLoader(){
            const loader = once(() => {
                const gsTest = /^gs:\/\//
                const httpTest = /^(http|https):\/\//
                if(!isNil(this.pageObj.video_poster)){
                    if(gsTest.test(this.pageObj.video_poster)){
                        utils.getResourceUrlFromStorage(this.pageObj.video_poster).then((url) => {
                            this.poster = url
                        })
                    }else if(httpTest.test(this.pageObj.video_poster)){
                        this.poster = this.pageObj.video_poster
                    }
                }
                if(gsTest.test(this.link)){
                    return utils.getDataUrlFromStorage(this.link).then((dataUrl) => {
                        this.vidLoaded = true
                        this.source = dataUrl
                        this.logger(this.idx + ' gs loaded')
                        return dataUrl
                    })
                    .catch((err) => {
                        console.error(err)
                    })
                }else if(httpTest.test(this.link)){
                    //eslint-disable-next-line no-unused-vars
                    if(process.env.VUE_APP_DRM_ENABLED == 'true' && 
                        (process.env.VUE_APP_HAS_APPLE_FIXED_BLOB_BUG == 'true'  || !this.isDeviceShitty()) &&
                        this.DRM){
                        let tries = 0
                        const createBlobFunction = (blobLink) => {
                            return new Promise((resolve, reject) => {
                                this.DRM.createImageBlob(blobLink, this.pageId, 'video/mp4', tries > 0).then((blobUrl) => {
                                    if(this.$refs?.videoElement){
                                        if(this.isDeviceShitty()){
                                            this.$refs.videoElement.onloadedmetadata = () => {
                                                this.logger('onloadedmetadata ' + this.idx)
                                                this.vidLoaded = true
                                                resolve(blobUrl)
                                            }
                                        }else{
                                            this.$refs.videoElement.onloadeddata = () => {
                                                this.logger('onloadeddata ' + this.idx)
                                                this.vidLoaded = true
                                                resolve(blobUrl)
                                            }
                                        }
                                        this.$refs.videoElement.onerror = () => {
                                            tries++;
                                            if(tries < 2){
                                                console.error(`Error ${this.$refs.videoElement.error.code}; details: ${this.$refs.videoElement.error.message}; retrying`)
                                                this.logger('refetching video')
                                                this.pageObj.getSignedImageUrl().then((newLink) => {
                                                    createBlobFunction(newLink).then(resolve).catch(reject)
                                                })
                                            }else{
                                                reject('video fetch error')
                                                console.error(`Error ${this.$refs.videoElement.error.code}; details: ${this.$refs.videoElement.error.message}`)
                                            }
                                        }
                                        this.source = blobUrl
                                        this.logger(this.idx + ' loaded')
                                    }
                                }).catch(reject)
                            })
                        }
                        return createBlobFunction(this.link)
                        // return new Promise((resolve, reject) => {
                        //     this.DRM.createImageBlob(this.link, this.pageId).then((blobUrl) => {
                        //         this.$refs.videoElement.oncanplaythrough = () => {
                        //             this.logger(this.idx + ' oncanplaythrough')
                        //             this.vidLoaded = true
                        //             // this.DRM.revokeImageBlob(this.pageId)
                        //             resolve(blobUrl)
                        //         }
                        //         this.source = blobUrl
                        //         this.logger(this.idx + ' loaded')
                        //     }).catch(reject)
                        // })
                    }else{
                        //eslint-disable-next-line no-unused-vars
                        return new Promise((resolve, reject) => {
                            if(this.$refs?.videoElement){
                                this.$refs.videoElement.onloadeddata = () => {
                                    this.vidLoaded = true
                                    resolve(this.link)
                                }
                            }
                            this.source = this.link
                            this.logger(this.idx + ' loaded')
                        })
                    }

                    //eslint-disable-next-line no-unused-vars
                    // return new Promise((resolve, reject) => {
                    //     this.logger(this.idx + ' loaded')
                    //     this.vidLoaded = true
                    //     this.source = this.link
                    //     resolve(this.link)
                    // })
                }
            })
            const scroller = once(() => {
                this.$refs.videoContainer.scrollIntoView({
                    behavior: 'smooth'
                });
            })

            const elem = this.$refs.videoElement

            return { loader, scroller, elem }
        }
    }
}
</script>

<style scoped>
.vid-paused::before{
    content:"";
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    z-index:1;
    background:rgba(0, 0, 0, 0.4);
}

.my-fade-enter-active,
.my-fade-leave-active {
    transition: opacity 0.5s ease;
}

.my-fade-enter-from,
.my-fade-leave-to {
    opacity: 0;
}
</style>