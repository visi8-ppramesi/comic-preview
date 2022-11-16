<template>
    <div class="h-full w-full px-3 pt-3">
        <div class="text-white">
            <div v-if="notifs.length > 0" id="my-notifications-title" class="font-bold text-xl">{{ $t("title") }}</div>
            <div v-else class="font-bold text-xl">{{ $t("noNotif") }}</div>
        </div>
        <div v-for="(notif, idx) in processedNotifs" class="rounded-md overflow-hidden max-w-xl w-full mx-auto flex text-black mb-2" :key="'notif-' + idx">
            <div :class="notif.unread ? 'bg-white' : 'bg-off-purple overlay'" class="relative rounded-md lg:text-md xl:text-lg flex-1 shadow-lg px-4 py-4 sm:px-6 sm:py-4 leading-relaxed drop-shadow-md" @click="goToComic(notif.comic)">
                <div class="flex flex-row">
                    <div class="flex flex-col w-full">
                        <div class="flex flex-row">
                            <div>
                                <img class="h-28 max-w-auto" style="max-width: fit-content;" :src="notif.chapter_preview_url" alt="">
                            </div>
                            <div class="px-3 flex flex-col flex-grow items-start justify-center gap-y-1">
                                <span class="notif-title font-extrabold text-sm leading-3 lg:text-md xl:text-lg">{{ $t("update", {title: notif.title, chapter_number: notif.chapter_number}) }}</span> <span class="=lg:text-sm xl:text-md text-xs text-gray-900 leading-3">{{ $t("release", {release_date: notif.created_date.toDate().toLocaleDateString('id-ID')}) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="enableLoadMore" class="flex items-center justify-center">
            <div class="bg-green-500 hover:bg-green-600 focus:outline-none active:ring-1 active:ring-green-300 active:bg-green-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white mt-5" @click="loadMore">{{ $t("load") }}</div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'
import Comic from '@/firebase/comics/Comic.js'
// import _ from 'lodash'
import over from 'lodash/over'
import { useMeta } from 'vue-meta'

const i18Texts = {
  messages: {
    en: {
        update: 'Comic Update: { title } Chapter { chapter_number }',
        release: 'Release date: { release_date }',
        load: 'Load More',
        title: 'New Comics',
        noNotif: 'You do not have any notification'
    },
    id: {
        update: 'Terakhir Diperbarui: { title } Chapter { chapter_number }',
        release: 'Tanggal Rilis: { release_date }',
        load: 'Muat Lebih Banyak',
        title: 'Komik Baru',
        noNotif: 'Tidak ada notifikasi'
    }
  }
}
export default{
    name: 'my-notifications',
    setup () {
        useMeta(
            {
                title: 'My Notifications Page',
                meta: [
                    { property: 'og:title', content: 'My Notifications Page' },
                    { property: 'og:description', content: `user's notification` },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/my-notifications' },
                ]
            },
        )
    },
    inject: ['routeResolver'],
    i18n: i18Texts,
    mounted(){
        this.loadingComponent = this.$loading.show({
            loader: 'dots'
        });

        if(this.userInstance){
            this.getNotifications().then(over([this.processNotifs, this.clearUnread]))
        }
    },
    beforeUnmount(){
        if(this.loadingComponent && document.getElementsByClassName('vld-container').length > 0){
            this.loadingComponent.hide();
        }
    },
    watch: {
        userInstance(){
            this.getNotifications().then(over([this.processNotifs, this.clearUnread]))
        }
    },
    data(){
        return {
            notifs: [],
            processedNotifs: [],
            loadingComponent: null,
            once: true,
            enableLoadMore: false
        }
    },
    computed: {
        ...mapState(useAuthStore, ['userInstance', 'unreadCount'])
    },
    methods: {
        goToComic(comicRef){
            this.$router.push(this.routeResolver('Comic', {id: comicRef.id}))
        },
        processNotifs(notifs){
            let notifCount = 0
            if(notifs.length < 1){
                this.loadingComponent.hide()
            }
            const test = notifs.map(async (notif) => {
                notifCount += 1
                const comicPromise = Comic.getDocumentWithStorageResourceUrl(notif.comic.id, ['cover_image_url'], true)
                //eslint-disable-next-line no-unused-vars
                const [ root, comicId, pathOne, chapterId ] = notif.chapter.path.split('/')
                // const chapterPromise = Chapter.getDocumentWithStorageResourceUrl([root, comicId, pathOne], chapterId, ['chapter_preview_url'])
                return Promise.all([comicPromise]).then(([cmc]) => {
                    const currentChapter = cmc.chapters_data.find(v => v.id == chapterId) ?? {}
                    this.processedNotifs.push({
                        ...cmc,
                        ...currentChapter,
                        ...notif,
                    })
                    this.processedNotifs.sort((a, b) => {
                        if(a.created_date > b.created_date){
                            return -1
                        }
                        if(a.created_date < b.created_date){
                            return 1
                        }
                        return 0
                    })
                    if(this.once){
                        this.loadingComponent.hide()
                        this.once = false
                    }
                }).catch(console.error)
            })
            Promise.all(test).then(() => {
                if(notifCount < 10){
                    this.enableLoadMore = false
                }else{
                    this.enableLoadMore = true
                }
            })
        },
        async loadMore(){
            const moreNotifs = await this.userInstance.getNotifications('comic', 10, this.notifs[this.notifs.length - 1].doc)
            this.notifs = [...this.notifs, ...moreNotifs]
            this.processNotif(moreNotifs)
        },
        async getNotifications(){
            this.notifs = await this.userInstance.getNotifications()
            return this.notifs
        },
        async clearUnread(){
            const unreadNotifs = this.notifs.filter(v => v.unread)
            if(this.unreadCount > 0 || unreadNotifs.length > 0){
                await this.userInstance.clearNotificationCount(unreadNotifs)
            }
        }
    }
}
</script>

<style scoped>
.overlay::before{
    content:"";
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    z-index:1;
    background:rgba(0, 0, 0, 0.4);
}

</style>