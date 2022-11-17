<template>
    <div v-if="!loading" class="md:mx-32 xl:mx-72 2xl:mx-xl">
        <div class="w-full">
            <div id="chapter-content-container" class="bg-black w-full">
                <template v-for="(page, idx) in pages" :key="'item-' + idx">
                    <div v-if="page.media_type == 'image'" class="w-full">
                        <image-viewer 
                            :page-obj="page" 
                            :page-id="page.id" 
                            :ar-link="getArLink(page)" 
                            :async-component="getAsyncComponentPath(page.async_component)" 
                            :link="page.page_image_url" 
                            :idx="idx" 
                            :ref="'mediaViewer' + idx"
                        ></image-viewer>
                    </div>
                    <div v-else-if="page.media_type == 'video'">
                        <video-player 
                            :page-obj="page"
                            :page-id="page.id"
                            :show-ar-button-timing="page.ar_button_show_time"
                            :ar-link="getArLink(page)"
                            :link="useSignedUrl ? page.page_image_url : page.unsecured_page_image_url"
                            :idx="idx"
                            :ref="'mediaViewer' + idx"
                            @playClicked="playClicked"
                        ></video-player>
                    </div>
                    <div v-else-if="page.media_type == 'comic-reader'" class="w-full">
                        <comic-reader
                            :page-obj="page" 
                            :page-id="page.id" 
                            :ar-link="getArLink(page)" 
                            :async-component="getAsyncComponentPath(page.async_component)" 
                            :link="page.page_image_url" 
                            :idx="idx" 
                            :ref="'mediaViewer' + idx"
                            :viewer-points="page.comic_viewer_points"
                        ></comic-reader>
                    </div>
                </template>
            </div>
            <!-- <div class="flex items-center pt-5 pb-3 justify-center">
                 <div class="container y mandatory-scroll-snapping">
                    <template v-for="(page, idx) in pages" :key="'item-' + idx">
                        <div v-if="page.media_type == 'image'">
                            <router-link :to="routeResolver('Scene', {page: page.id})">
                                <img class="w-full h-full lg:object-fill lg:w-full" :src="page.image_url">
                            </router-link>
                        </div>
                        <div v-else-if="page.media_type == 'video'">
                            <video-player :link="page.page_image_url" :idx="idx" :ref="'videoPlayer' + idx" :key="'video-' + idx"></video-player>
                        </div>
                    </template>
                </div>
            </div> -->

            <div class="bg-indigo-800 mx-32 my-3 py-6 rounded-xl">
                <div class="flex items-center justify-center">
                    <svg class="w-16 h-16" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 491.537 491.537" style="enable-background:new 0 0 491.537 491.537; fill: #ffffff;" xml:space="preserve">
                        <g>
                            <g>
                                <path d="M488.117,459.466l-223.1-447.2c-10.4-17.4-32-13.1-37.5,0l-225.2,449.3c-8,15.6,6.3,29.2,18.8,29.2h449.6c0,0,0.3,0,0.8,0
                                    C487.517,490.766,497.017,472.466,488.117,459.466z M54.417,450.066l191.8-383.6l190.8,383.7h-382.6V450.066z"/>
                                <path d="M225.417,206.166v104.3c0,11.5,9.4,20.9,20.9,20.9c11.5,0,19.8-8.3,20.9-19.8v-105.4c0-11.5-9.4-20.9-20.9-20.9
                                    C234.817,185.266,225.417,194.666,225.417,206.166z"/>
                                <circle cx="246.217" cy="388.066" r="20.5"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class="pt-6 px-10 text-white text-center font-bold text-lg">
                    Our comics will soon be available at 
                    your nearest comic book stores. Please come 
                    back later for more updates!
                </div>
            </div>

            <div class="w-full px-5 text-center">
                <div class="flex pb-3 pt-2">
                    <select class="rounded-lg form-select block w-full mt-1 xl:text-xl" @change="changeChapter(selectedChapter)" v-model="selectedChapter">
                        <option class="chapter-episode" v-for="(chapter, idx) in chapters" :value="chapter.id" :key="'cpt-' + idx">{{ $t("episode", {chapter_number: chapter.chapter_number}) }}</option>
                    </select>
                </div>
                <label id="chapter" for="chapter" class="text-white xl:text-2xl">{{ $t("chapter") }}</label>
            </div>

            <div class="flex justify-center mt-8 pb-5">
                <button @click="prevChapter" :class="{ 'bg-purple-500': prevEnabled, 'bg-purple-200': !prevEnabled }" class="text-xs lg:text-lg items-center min-h-8 w-116 flex p-2 rounded-lg text-gray-50 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 h-4 w-4 md:h-6 md:w-6 mr-1" fill="none" viewBox="0 0 24 24" :stroke="!prevEnabled ? '#919191' : '#2f2f2f'">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <div id="chapter-prev" class="mx-1" :class="!prevEnabled ? 'text-gray-500' : ''">{{ $t("prev") }}</div>
                </button>
                <button @click="goBack" class="text-xs mx-2 lg:text-lg items-center min-h-8 w-116 p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("goBack") }}</button>
                <button @click="nextChapter" :class="{ 'bg-purple-500': nextEnabled, 'bg-purple-200': !nextEnabled }" class="text-xs lg:text-lg items-center min-h-8 w-116 flex p-2 rounded-lg text-gray-50 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <div id="chapter-next" class="mx-1" :class="!nextEnabled ? 'text-gray-500' : ''">{{ $t("next") }}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-6 md:w-6 ml-1 mx-1" fill="none" viewBox="0 0 24 24" :stroke="!nextEnabled ? '#919191' : '#2f2f2f'">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div v-else class="min-h-screen-navbar min-w-screen">

    </div>
</template>

<script>

// import comic1 from "../assets/2.jpg";
// import comic2 from "../assets/3.jpg";
// import comic3 from "../assets/4.jpg";
// import comic4 from "../assets/5.jpg";
// import comic5 from "../assets/comic.png";
import Chapter from '../firebase/comics/Chapter.js'
import VideoPlayer from '../components/VideoPlayer.vue'
import ImageViewer from '../components/ImageViewer.vue'
import ComicReader from '../components/ComicReader.vue'
import { orderBy } from 'firebase/firestore'
import { useViewStore } from '../store/view.js'
// import _ from 'lodash'
import once from 'lodash/once'
// import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
import { useMeta } from 'vue-meta'
import Comic from '@/firebase/comics/Comic';
import { errorTypes } from '@/utils/handleError.js'

const i18Texts = {
  messages: {
    en: {
        episode: 'Episode {chapter_number}',
        chapter: 'Select Chapter',
        prev: 'Prev',
        next: 'Next',
        goBack: 'Go Back'
    },
    id: {
        episode: 'Episode {chapter_number}',
        chapter: 'Pilih Chapter',
        prev: 'Sebelumnya',
        next: 'Selanjutnya',
        goBack: 'Kembali'
    }
  }
}

export default {
    name: 'chapter',
    setup () {
        useMeta(
            {
                title: 'Chapter Page',
                meta: [
                    { property: 'og:title', content: 'Chapter Page' },
                    { property: 'og:description', content: 'comic content and chapter list' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/comic/comicId/chapter/chapterId' },
                ]
            },
        )
    },
    i18n: i18Texts,
    inject: ['routeResolver', 'detectMobile', 'isDeviceShitty'],
    components: {
        ImageViewer,
        VideoPlayer,
        ComicReader
    },
    data(){
        return {
            canScrollTrack: false,
            prevEnabled: true,
            nextEnabled: true,
            loading: true,
            comic: null,
            // pages:[
            //     {image_url: comic1},
            //     {image_url: comic2},
            //     {image_url: comic3},
            //     {image_url: comic4},
            //     {image_url: comic5},
            // ],
            chapters: [],
            chapter: null,
            pages: [],
            chapterPromise: null,
            scrollFunc: null,
            selectedChapter: null,
            loadingComponent: null,
            scrollTracker: null,
        }
    },
    computed: {
        useSignedUrl(){
            return process.env.VUE_APP_HAS_APPLE_FIXED_BLOB_BUG == 'true' || !this.isDeviceShitty()
        }
    },
    watch: {
        comic(){
            this.chapters = this.comic.chapters_data
                .filter((chapter) => isNil(chapter?.hidden) || !(chapter?.hidden))
                .sort((a, b) => {
                    if(a.chapter_number < b.chapter_number){
                        return -1
                    }else if(a.chapter_number > b.chapter_number){
                        return 1
                    }

                    return 0
                })

            const findCpt = this.chapters.findIndex((cpt) => cpt.id == this.$route.params.chapterId)
            if(findCpt == 0){
                this.prevEnabled = false
            }
            if(findCpt == this.chapters.length - 1){
                this.nextEnabled = false
            }
        }
    },
    created(){
        // if(!document.getElementById('8thwall-script') && this.detectMobile()){
        //     const script = document.createElement('script')
        //     script.setAttribute('src', `https://apps.8thwall.com/xrweb?appKey=${process.env.VUE_APP_8THWALL_APP_KEY}`)
        //     script.setAttribute('id', '8thwall-script')
        //     document.head.appendChild(script)
        //     script.addEventListener('load', () => {
        //     })
        //     window.addEventListener('xrloaded', () => {
        //     })
        // }
        const viewStore = useViewStore()
        this.chapterPromise = this.fetchChapter().then(() => {
            viewStore.viewChapter(this.chapter)
            this.fbAnalytics.logEvent('chapter_viewed', { comic_id: this.$route.params.comicId, chapter_id: this.$route.params.chapterId })
            this.loading = false
            return true
        })
        .catch((err) => {
            console.error(err)
            // this.$router.push(this.routeResolver('NotFound'))
            switch(err){
                case errorTypes.getDocumentError:
                    this.$toast.open({
                        message: "There was an error. Refreshing the page in 10 seconds...",
                        type: "error",
                        duration: 5000,
                        dismissible: true,
                        position: 'bottom'
                    });
                    setTimeout(this.$router.go, 10000)
                    break;
                case errorTypes.chapterNotFoundError:
                    this.$router.push(this.routeResolver('NotFound'));
                    break;
                default: 
                    this.$router.push(this.routeResolver('Dashboard'));
                    break;
            }   
            return false
        })
        this.fetchComic()
    },
    mounted(){
        this.loadingComponent = this.$loading.show({
            loader: 'dots'
        });
        this.selectedChapter = this.$route.params.chapterId
        this.chapterPromise.then((weGood) => {
            if(!weGood){
                return
            }
            const contentHeight = this.getContentHeight()
            if(!isNil(contentHeight)){
                document.getElementById('chapter-content-container').style.minHeight = contentHeight + 'px'
            }
            const mediaElements = []
            Object.keys(this.$refs).forEach((el) => {
                mediaElements.push(this.$refs[el][0].getLoader())
            })
            const mediaElemsDupe = [...mediaElements]
            // const pagesDupe = [...this.pages]
            // pagesDupe.pop()
            //eslint-disable-next-line no-unused-vars
            mediaElemsDupe.forEach((page, idx) => {
                if(idx < mediaElemsDupe.length - 1){
                    if(this.pages[idx].media_type == 'video'){
                        // const containerIndex = 'mediaViewer' + (idx + 1)
                        // const play = once(this.$refs[containerIndex][0].playVideo)
                        mediaElemsDupe[idx].elem.addEventListener('ended', () => {
                            // mediaElemsDupe[idx + 1].loader()
                            mediaElemsDupe[idx + 1].scroller()
                            // play()
                        })
                    }else if(this.pages[idx].media_type == 'comic-reader'){
                        // const containerIndex = 'mediaViewer' + (idx + 1)
                        // const play = once(this.$refs[containerIndex][0].playVideo)
                        mediaElemsDupe[idx].elem.addEventListener('done-reading', () => {
                            // mediaElemsDupe[idx + 1].loader()
                            mediaElemsDupe[idx + 1].scroller()
                            // play()
                        })
                    }
                }
            })
            const firstMedia = mediaElements.shift()

            const loadAllContent = function(){
                const mediaLoaderPromise = mediaElements.map((l) => l.loader())
                return [
                    Promise.all(mediaLoaderPromise),
                    Promise.any(mediaLoaderPromise)
                ]
            }
            firstMedia.loader().then(() => {
                const loaderPromise = once(loadAllContent)()
                loaderPromise[0].then(this.startScrollTracking).then(this.saveContentHeight)//.then(this.scrollToSavedLocation)
                loaderPromise[1].then(this.scrollToSavedLocation)
            })

            // const loadFirstContent = async function(){
            //     await mediaElements[0].loader()
            //     const zerothRect = mediaElements[0].elem.getBoundingClientRect()
            //     let contentHeight = zerothRect.height
            //     let counter = 1
            //     while(contentHeight < window.innerHeight && counter < mediaElements.length){
            //         await mediaElements[counter].loader()
            //         const rect = mediaElements[counter].elem.getBoundingClientRect()
            //         contentHeight += rect.height
            //         counter++
            //     }
            // }

            // once(loadFirstContent)()

            // mediaElements[0].loader().then(() => {
            //     const zerothRect = mediaElements[0].elem.getBoundingClientRect()
            //     if(zerothRect.height < window.innerHeight){
            //         mediaElements[1].loader().then(() => {
            //             const firstRect = mediaElements[2].elem.getBoundingClientRect()
            //             if(zerothRect.height + firstRect.height < window.innerHeight){
            //                 mediaElements[2].loader()
            //             }
            //         })
            //     }
            // })
            // mediaElements[0].scroller()
            const debouncedScrollSaver = debounce(() => {
                if(this.canScrollTrack){
                    const scrollLocation = document.scrollingElement.scrollTop
                    const scrollName = ['scroll', 'location', this.$route.params.comicId, this.$route.params.chapterId].join('_')
                    localStorage.setItem(scrollName, scrollLocation)
                }
            }, 100)

            this.scrollFunc = () => {
                debouncedScrollSaver()
                // throttle(() => {
                //     for(let i = 1; i < this.pages.length; i++){
                //         const containerIndex = 'mediaViewer' + i
                //         const myRect = this.$refs[containerIndex][0].$el.getBoundingClientRect()
                //         if(myRect.top - window.innerHeight < 10){
                //             mediaElements[i].loader()
                //         }
                //         // if(!isEmpty(this.$refs[containerIndex][0])){
                //         // }
                //     }
                // }, 200)()
            }

            document.addEventListener('scroll', this.scrollFunc)
            
            this.loadingComponent.hide()
        })
        .catch(() => {
            this.loadingComponent.hide()
        })
    },
    beforeUnmount(){
        if(this.loadingComponent && document.getElementsByClassName('vld-container').length > 0){
            this.loadingComponent.hide()
        }
        if(this.scrollFunc){
            document.removeEventListener('scroll', this.scrollFunc)
        }
        if(this.scrollTracker){
            window.removeEventListener('scroll', this.scrollTracker)
        }
    },
    methods: {
        getContentHeight(){
            const contentName = ['content', 'height', this.$route.params.comicId, this.$route.params.chapterId].join('_')
            return localStorage.getItem(contentName)
        },
        saveContentHeight(){
            const contentName = ['content', 'height', this.$route.params.comicId, this.$route.params.chapterId].join('_')
            const currentStoredContentHeight = this.getContentHeight()
            if(isNil(currentStoredContentHeight)){
                const height = document.getElementById('chapter-content-container').getBoundingClientRect().height
                localStorage.setItem(contentName, height)
            }
        },
        scrollToSavedLocation(){
            setTimeout(() => {
                this.canScrollTrack = true
            }, 1000)
            const scrollName = ['scroll', 'location', this.$route.params.comicId, this.$route.params.chapterId].join('_')
            let lastLocation = localStorage.getItem(scrollName)
            if(!isNil(lastLocation)){
                window.scrollTo({ top: parseInt(lastLocation), behavior: 'smooth' })
            }
        },
        startScrollTracking(){
            let percentPage
            const scrollName = ['scroll', 'tracker', this.$route.params.comicId, this.$route.params.chapterId].join('_')
            const savedScrollTracker = localStorage.getItem(scrollName)
            const slices = 20
            if(isNil(savedScrollTracker)){
                const percentCreator = k => Array(k).fill().map((v, idx) => (idx + 1) / k).reduce((acc, v) => {
                    acc[v] = false
                    return acc
                }, {})
                percentPage = percentCreator(slices)
                localStorage.setItem(scrollName, JSON.stringify(percentPage))
            }else{
                percentPage = JSON.parse(savedScrollTracker)
            }

            this.scrollTracker = () => {
                const rect = document.getElementById('chapter-content-container').getBoundingClientRect()
                if(rect.top < 0){
                    const contentHeight = rect.height
                    const absTop = Math.abs(rect.top)
                    const viewportHeight = window.innerHeight
                    const viewProportion = (absTop + viewportHeight) / contentHeight
                    const floored = Math.floor(viewProportion * slices) / slices
                    if(!percentPage['' + floored]){
                        // const eventName = `chapter_scroll_${this.$route.params.comicId}_${this.$route.params.chapterId}`
                        const where = Math.round(floored * 100)
                        // this.fbAnalytics.logEvent(eventName, { read_to: where })
                        this.fbAnalytics.logEvent('reading', { reading_to: 1, read_to: '' + where, chapter_id: this.$route.params.chapterId })
                        percentPage['' + floored] = true
                        localStorage.setItem(scrollName, JSON.stringify(percentPage))
                    }
                }
            }
            
            window.addEventListener('scroll', this.scrollTracker)
        },
        getAsyncComponentPath(xtr){
            return xtr ?? ''
        },
        playClicked(idx){
            this.pages.forEach((page, pIdx) => {
                if(page.media_type == 'video' && idx !== pIdx){
                    const containerIndex = 'mediaViewer' + pIdx
                    this.$refs[containerIndex][0].pauseVideo()
                }
            })
        },
        getArLink(page){
            if(isArray(page.scenes_data)){
                const routeResolved = this.routeResolver('Scene', {
                    comicId: this.$route.params.comicId,
                    chapterId: this.$route.params.chapterId,
                    pageId: page.id,
                    sceneId: page.scenes_data[0]
                })
                return routeResolved
            }else{
                return {}
            }
        },
        changeChapter(chapterId){
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.comicId, chapterId: chapterId}))
        },
        prevChapter(){
            const findCpt = this.chapters.findIndex((cpt) => cpt.id == this.$route.params.chapterId)
            const prevCpt = this.chapters[findCpt - 1]
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.comicId, chapterId: prevCpt.id}))
        },
        goBack(){
            this.$router.push(this.routeResolver('Comic', {id: this.$route.params.comicId}))
        },
        nextChapter(){
            const findCpt = this.chapters.findIndex((cpt) => cpt.id == this.$route.params.chapterId)
            const nextCpt = this.chapters[findCpt + 1]
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.comicId, chapterId: nextCpt.id}))
        },
        async fetchComic(){
            this.comic = await Comic.getDocument(this.$route.params.comicId)
            return true
        },
        async fetchChapter(){
            try{
                this.chapter = await Chapter.getDocument(['comics', this.$route.params.comicId, 'chapters'], this.$route.params.chapterId)
            }catch(err){
                console.error(err)
                throw errorTypes.getDocumentError
            }
            if(this.chapter.empty){
                throw errorTypes.chapterNotFoundError
            }
            
            // const comicPromise = Comic.getDocument(this.$route.params.comicId)
            if(process.env.VUE_APP_DRM_ENABLED == 'true' && this.DRM){
                this.logger('drm enabled')
                this.pages = await this.chapter.getPagesWithSignedUrl([orderBy('page_number')])
            }else{
                this.logger('drm disabled')
                this.pages = await this.chapter.getPages([orderBy('page_number')])
            }
            // this.pages = await Promise.all([comicPromise, pagesPromise])
            // this.pages = pages
            // this.comic = comic
            return true
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    overflow-y: auto;
    flex: none;
}

.container.y {
    width: 380px;
    height: 650px;
    flex-flow: column nowrap;
}

.y.mandatory-scroll-snapping {
    scroll-snap-type: y mandatory;
}

.container > div {
    text-align: center;
    scroll-snap-align: center;
    flex: none;
}

.y.container > div {
    line-height: 256px;
    font-size: 128px;
    width: 100%;
    height: 100%;
}
/* appearance fixes */
.y.container > div:first-child {
    line-height: 1.3;
    font-size: 64px;
}

@media only screen and (min-width: 768px) and (max-width: 959px){
    .container.y {
        width: 457px;
        height: 650px;
        flex-flow: column nowrap;
    }
}

@media only screen and (min-width: 1024px) and (max-width: 1240px){
    .container.y {
        width: 720px;
        height: 1000px;
        flex-flow: column nowrap;
    }
}

@media only screen and (min-width: 1440px) and (max-width: 1560px){
    .container.y {
        width: 820px;
        height: 1150px;
        flex-flow: column nowrap;
    }
}

@media only screen and (min-width: 1920px) and (max-width: 2560px){
    .container.y {
        width: 900px;
        height: 1150px;
        flex-flow: column nowrap;
    }
}

</style>