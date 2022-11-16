<template>
    <div class="lg:mx-20 xl:mx-32 mb-10">
        <div v-if="!loading">
            <div class="md:grid md:grid-cols-2 md:rounded-b-lg shadow-md overflow-hidden bg-indigo-800">
                <div class="md:grid md:grid-cols-1">
                    <div class="bg-center min-h-screen-navbar md:min-h-screen/2 md:max-h-full bg-cover md:w-full max-h-screen text-left pt-64 description-block text-white flex flex-col justify-end p-5" :style="'background-image:linear-gradient(to bottom, rgba(245, 246, 252, 0), rgb(0 0 0 / 73%)), url(' + comic.cover_image_url + ');'"><!-- top block -->
                        <div>
                            <div id="categories" class="lg:text-md xl:text-lg">{{categories}}</div>
                        </div>

                        <div class="flex flex-row justify-between">
                            <div id="title" class="font-ubuntu text-2xl lg:text-3xl xl:text-4xl font-bold w-2/3">{{ comic.title }}</div>
                            <!-- <button :class="{'bg-transparent ring-white ring-inset ring-2': subscribed, 'bg-green-400': !subscribed}" class="animated w-fit-content h-fit-content inline-flex items-center justify-center px-2 py-1 rounded-full text-gray-50 bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                Subscribe
                            </button> -->
                        </div>

                        <div v-if="comic?.authors_data">
                            <template v-for="(author, idx) in comic.authors_data" :key="'author-' + idx">
                                <div  class="lg:text-lg xl:text-xl font-semibold">{{author.name}}</div>
                            </template>
                        </div>

                        <div class="text-sm lg:text-md xl:text-lg font-open-sans" v-html="comic.description"></div>

                        <div class="flex mt-2">
                            <svg class="lg:h-7 lg:w-7 xl:h-8 xl:h-8" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            <div id="comic-views" class="text-sm px-2 lg:text-md xl:text-lg">{{ $t("views", {view_count: comic.view_count}) }}</div>
                            <div class="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-7 lg:w-7 xl:h-8 xl:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <div class="text-sm px-2 lg:text-md xl:text-lg">{{ comic.favorite_count }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="comic-list-container" class="md:grid md:grid-cols-1 max-h-screen overflow-y-scroll">
                    <div class="divide-y divide-black">
                        <div class="md:bg-indigo-800 md:w-full md:h-full">
                            <div class="flex flex-row h-24 md:w-full bg-indigo-800 text-white border-t border-[#39348f]" v-for="(chapter, idx) in chapters" :key="'chapter-'+idx">
                                <div class="flex-none w-1/5 md:w-24 lg:w-24">
                                    <img class="h-full w-full object-cover" :src="chapter.chapter_preview_url" alt="">
                                </div>
                                <!-- <div class="flex-grow flex flex-col p-3 w-2/5 lg:w-2" @click="goToChapter(chapter.id)"> -->
                                <div class="flex-grow text-left flex flex-col py-3 pl-3 w-2/5 lg:w-96">
                                    <div class="w-100">
                                        <span id="comic-episode" class="text-sm lg:text-md xl:text-lg">{{ $t("episode", {chapter_number: chapter.chapter_number}) }}</span>
                                        <span class="text-xs lg:text-md xl:text-lg ml-2">{{chapter.release_date}}</span>
                                    </div>
                                    <div class="flex flex-row mt-2">
                                        <div class="flex flex-row">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-7 lg:w-7 xl:h-7 xl:w-7" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            <div class="text-xs lg:text-xl xl:text-xl lg:mx-2 xl:mx-2 px-0.5">{{chapter.view_count}}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-2/5 md:w-36 lg:w-96 flex justify-end items-center pr-5" >
                                    <div v-if="purchasedChapterIds.includes(chapter.id) || comicFullyPurchased">
                                        <button class="read-button text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="goToChapter(chapter.id)">
                                            {{ $t("read", {chapter_number: chapter.chapter_number}) }}
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button id="comic-buy" class="buy-button text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="purchaseChapter(chapter.id)">
                                            {{ $t("buyComic", {chapter_number: chapter.chapter_number}) }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="min-h-screen-navbar min-w-screen">

        </div>
    </div>
    <Teleport to="#modal">
        <payment-modal
            v-if="enablePaymentModal"
            ref="paymentModal"
            :chapter-data="selectedChapterData"
            :comic-data="comic"
        />
    </Teleport>
    <Teleport to="#modal">
        <age-check-modal v-if="ageCheck" ref="ageCheckModal" />
    </Teleport>
</template>

<script>
import AgeCheckModal from '../components/AgeCheckModal.vue'
import PaymentModal from '../components/PaymentModal.vue'
// import CommentComponent from '../components/Comment.vue'
import Comic from '@/firebase/comics/Comic.js';
import Comment from '@/firebase/comics/Comment.js';
// import { orderByDateDesc } from '@/firebase/utils/queries.js'
// import Comment from '@/firebase/comics/Comment.js';
// import comic from "../assets/comic.jpeg";
// import _ from 'lodash'
import isNil from 'lodash/isNil'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'
import once from 'lodash/once'
import capitalize from 'lodash/capitalize'
import remove from 'lodash/remove'
// import findIndex from 'lodash/findIndex'
import { useViewStore } from '../store/view.js'
import { useAuthStore } from '../store/auth.js'
import { mapState } from 'pinia'
// import utils from '../firebase/utils/index.js'
import { useMeta } from 'vue-meta'
import { errorTypes } from '@/utils/handleError.js'

const i18Texts = {
  messages: {
    en: {
        views: '{ view_count } views',
        purchase: 'Purchase Comic (Rp. {price})',
        buy: 'buy comic',
        episode: 'Ep. {chapter_number}',
        read: 'Read Ep. {chapter_number}',
        buyComic: 'Buy Ep. {chapter_number}',
        commentTitle: 'Add a new comment',
        comment: 'Latest Comments',
        geofenceError: `Sorry, we don't sell comics outside of Indonesia (for now) :(`
    },
    id: {
        views: 'Dilihat { view_count } kali',
        purchase: 'Beli Komik sebesar (Rp. {price})',
        buy: 'beli komik',
        episode: 'Ep. {chapter_number}',
        read: 'Baca Ep. {chapter_number}',
        buyComic: 'Beli Ep. {chapter_number}',
        commentTitle: 'Tambahkan komentar',
        comment: 'Komentar Terbaru',
        geofenceError: `Maaf, kami tidak menjual komik di luar Indonesia (saat ini) :(`
    }
  }
}
export default {
    name: 'comic-show',
    setup () {
        useMeta(
            {
                title: 'Comic Page',
                meta: [
                    { property: 'og:title', content: 'Comic Page' },
                    { property: 'og:description', content: 'episode list of comic' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/comic/comicId' },
                ]
            },
        )
    },
    i18n: i18Texts,
    inject: ['routeResolver'],
    components: {
        // CommentComponent,
        PaymentModal,
        AgeCheckModal
    },
    data(){
        const self = this
        return {
            ageCheck: false,
            enablePaymentModal: false,
            selectedPrice: null,
            selectedChapter: null,
            loading: true,
            comic: {},
            genres: [
                {title: 'adventure'}
            ],
            authors: [
                {name: 'Andrew White'}
            ],
            chapters: [],
            favorited: false,
            subscribed: false,
            purchasedChapterIds: [],
            comments: [],
            newComment: '',
            comicFullyPurchased: false,
            selectedChapterData: null,
            subscribeDisabled: false,
            favoriteDisabled: false,
            commentListener: null,
            loadingComponent: null,
            // onceResolveGating: once(self.resolveAgeGating),
            onceHandleStatuses: once(self.handleStatuses)
            // categories: ''
        }
    },
    created(){
        this.emitter.on('chapterPurchased', (chapters) => {
            this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...chapters])]
            this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
        })
        this.loadingComponent = this.$loading.show({
            loader: 'dots'
        });
        // const authStore = useAuthStore()
        this.fetchComic().then(() => {
            this.loading = false
            this.loadingComponent.hide()
            // this.resolveAgeGating()
            this.fireAnalytics()
        })
        .catch((err) => {
            this.loading = false
            this.loadingComponent.hide()
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
                case errorTypes.comicNotFoundError:
                    this.$router.push(this.routeResolver('NotFound'));
                    break;
                default: 
                    this.$router.push(this.routeResolver('Dashboard'));
                    break;
            }   
        })
        if(!isNil(this.userData)){
            this.onceHandleStatuses()
            // const favComicIds = this.userData.favorites.map((comicRef) => {
            //     return comicRef.id
            // })
            // this.favorited = includes(favComicIds, this.$route.params.id)

            // const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
            //     return comicRef.id
            // })
            // this.subscribed = includes(subComicIds, this.$route.params.id)

            // this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpts) => {
            //     if(cpts.chapters.includes('all')){
            //         this.comicFullyPurchased = true
            //         this.enablePaymentModal = false
            //     }else{
            //         this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpts.chapters.map((v) => v.id)])]
            //         this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
            //     }
            // })
        }
    },
    watch: {
        userData(){
            if(!isNil(this.userData)){
                this.onceHandleStatuses()
                // const favComicIds = this.userData.favorites.map((comicRef) => {
                //     return comicRef.id
                // })
                // this.favorited = includes(favComicIds, this.$route.params.id)

                // const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
                //     return comicRef.id
                // })
                // this.subscribed = includes(subComicIds, this.$route.params.id)

                // this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpts) => {
                //     if(cpts.chapters.includes('all')){
                //         this.comicFullyPurchased = true
                //         this.enablePaymentModal = false
                //     }else{
                //         this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpts.chapters.map((v) => v.id)])]
                //         this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
                //     }
                // })
            }
        }
    },
    computed:{
        categories(){
            if(!isEmpty(this.comic)){
                return this.comic.categories.map(capitalize).join(', ')
            }else{
                return ''
            }
        },
        ...mapState(useAuthStore, {
            userData: 'user',
            userInstance: 'userInstance',
            isLoggedIn: 'isLoggedIn',
            userDob: 'userDob'
        })
    },
    methods: {
        resolveAgeGating(){
            const shouldBeGated = !isNil(this.comic.age_gate) && this.comic.age_gate
            const userNotOldEnough = isNil(this.userDob) || 
                (!isNil(this.userDob) && this.userDob > new Date(new Date().setFullYear(new Date().getFullYear() - 17)))
            if(shouldBeGated && userNotOldEnough){
                this.ageCheck = true
                this.$nextTick(() => {
                    this.$refs.ageCheckModal.openModal()
                })
            }
        },
        fireAnalytics(){
            const viewStore = useViewStore()
            viewStore.viewComic(this.comic)
            this.fbAnalytics.logEvent('comic_viewed', { comic_id: this.$route.params.id })
        },
        handleStatuses(){
            const favComicIds = this.userData.favorites.map((comicRef) => {
                return comicRef.id
            })
            this.favorited = includes(favComicIds, this.$route.params.id)

            const subComicIds = this.userData.comic_subscriptions.map((comicRef) => {
                return comicRef.id
            })
            this.subscribed = includes(subComicIds, this.$route.params.id)

            this.userInstance.getPurchasedComicStatus(this.$route.params.id).then((cpts) => {
                if(cpts.chapters.includes('all')){
                    this.comicFullyPurchased = true
                    this.enablePaymentModal = false
                }else{
                    this.purchasedChapterIds = [...new Set([...this.purchasedChapterIds, ...cpts.chapters.map((v) => v.id)])]
                    this.enablePaymentModal = this.purchasedChapterIds.length != this.chapters.length
                }
            })
        },
        isNilWrapper(v){
            return isNil(v)
        },
        insertPurchase(cptId){
            this.purchasedChapterIds.push(cptId)
        },
        onCommentDelete(id){
            this.comments = remove(this.comments, (comment) => {
                return comment.id != id
            })
        },
        canUserDelete(userRef){
            if(!this.userData){
                return false
            }
            return userRef.id == this.userData.id
        },
        goToChapter(chapterId){
            this.$router.push(this.routeResolver('Chapter', {comicId: this.$route.params.id, chapterId: chapterId}))
        },
        showGeofenceError(){
            this.$toast.open({
                message: this.$t('geofenceError'),
                type: "error",
                duration: 5000,
                dismissible: true
            })
        },
        async purchaseComic(){
            if(!isNil(this.userData)){
                await this.geofencePromise
                if(this.geofence){
                    this.selectedChapterData = 'all'
                    this.$refs.paymentModal.setState('chapterData', 'all')
                    this.$refs.paymentModal.setState('comicData', this.comic)
                    this.$refs.paymentModal.openModal()
                }else{
                    this.showGeofenceError()
                }
            }else{
                this.$router.push(this.routeResolver('Login'))
            }
        },
        async purchaseChapter(chapterId){
            if(!isNil(this.userData)){
                await this.geofencePromise
                if(this.geofence){
                    this.selectedChapterData = this.chapters.find(c => c.id == chapterId)
                    this.$refs.paymentModal.setState('chapterData', this.selectedChapterData)
                    this.$refs.paymentModal.setState('comicData', this.comic)
                    this.$refs.paymentModal.openModal()
                }else{
                    this.showGeofenceError()
                }
            }else{
                this.$router.push(this.routeResolver('Login'))
            }
        },
        async toggleSubscribeComic(){
            this.subscribeDisabled = true
            if(this.userInstance){
                if(this.subscribed){
                    await this.userInstance.unsubscribeComic(this.$route.params.id)
                    this.subscribed = false
                    this.subscribeDisabled = true
                }else{
                    await this.userInstance.subscribeComic(this.$route.params.id)
                    this.subscribed = true
                    this.subscribeDisabled = true
                }
            }else{
                this.subscribeDisabled = true
                this.$router.push({name: 'Login'})
            }
        },
        async toggleFavoriteComic(){
            this.favoriteDisabled = true
            if(this.userInstance){
                if(this.favorited){
                    await this.userInstance.unfavoriteComic(this.$route.params.id)
                    this.favoriteDisabled = false
                    this.favorited = false
                    this.fbAnalytics.logEvent('comic_unfavorited', { comic_id: this.$route.params.id })
                }else{
                    await this.userInstance.favoriteComic(this.$route.params.id)
                    this.favoriteDisabled = false
                    this.fbAnalytics.logEvent('comic_favorited', { comic_id: this.$route.params.id })
                    this.favorited = true
                }
            }else{
                this.$router.push({name: 'Login'})
            }
        },
        formatChapter(cpt){
            cpt.release_date = cpt.release_date.toDate().toLocaleDateString('id-ID')
            return cpt
        },
        async fetchComic(){
            try{
                this.comic = await Comic.getDocumentWithStorageResource(this.$route.params.id, ['cover_image_url'], true)
            }catch(error){
                throw errorTypes.getDocumentError
            }
            if(this.comic.empty){
                throw errorTypes.comicNotFoundError
            }
            // this.comic.getComments(orderByDateDesc()).then((comments) => {
            //     this.comments = comments
            // }).then(() => {
            //     let firstRun = this.comments == 0
            //     this.commentListener = this.comic.createNewCommentListener((newCommInstance) => {
            //         if(firstRun){
            //             const foundId = findIndex(this.comments, (com) => {
            //                 return com.id == newCommInstance.id
            //             })
            //             if(foundId < 0){
            //                 utils.getDataUrlFromStorage(newCommInstance.user_data.profile_image_url).then((image) => {
            //                     newCommInstance.user_data.profile_image_url = image
            //                     this.comments.unshift(newCommInstance)
            //                 })
            //             }
            //         }else{
            //             firstRun = true
            //         }
            //     })
            // })
            this.chapters = this.comic.chapters_data.map(this.formatChapter)//(await this.comic.getChaptersWithStorageResource()).map(this.formatChapter)
                .filter((chapter) => isNil(chapter?.hidden) || !(chapter?.hidden))
                .sort((a, b) => {
                    if(a.chapter_number > b.chapter_number){
                        return 1
                    }
                    if(a.chapter_number < b.chapter_number){
                        return -1
                    }
                    return 0
                })
            // for(let i = 0; i < tempChapters.length; i++){
            //     tempChapters[i].chapter_preview_url = await utils.getDataUrlFromStorage(tempChapters[i].chapter_preview_url)
            //     this.chapters.push(tempChapters[i])
            // }

            this.purchasedChapterIds.push(...this.chapters.filter((cpt) => cpt.price == 0).map(cpt => cpt.id))
            return this.comic
        },
        async submitComment(){
            await Comment.addComment(this.$route.params.id, this.newComment, this.userData)
            this.newComment = ''
        }
    },
    beforeUnmount(){
        if(this.commentListener){
            this.commentListener()
        }
    }
}
</script>

<style>
#comic-list-container::-webkit-scrollbar {
    width: 7px;
}

#comic-list-container::-webkit-scrollbar-track {
    background-color: #352f98;
}

#comic-list-container::-webkit-scrollbar-thumb {
    background-color: #2d246e;
}
</style>