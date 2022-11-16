// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import Page from './Page.js'
import firebaseSettings from '../firebaseSettings.js'
// import fb from '../firebase.js'
// import { httpsCallable } from 'firebase/functions';
import { 
    doc, 
    increment, 
    // updateDoc, 
    // setDoc, 
    arrayUnion, 
    writeBatch 
} from 'firebase/firestore'
import { StorageLink } from '../types/index.js';
import signedUrlFetchers from '@/utils/signedUrlFetcher'

export default class extends Subcollection{
    static collection = 'chapters'
    static fields = {
        'chapter_number': Number,
        'release_date': Date,
        'view_count': Number,
        'price': Number,
        'ar_price': Number,
        'pages': Subcollection.resolve('./Page.js'),
        'chapter_preview_url': StorageLink
    }

    async viewChapter(userId = null){
        const counterIndex = Math.floor(Math.random() * firebaseSettings.counterShardNum).toString()
        const chapterCounterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id, 'counters', counterIndex)

        const batch = writeBatch(this.constructor.db)

        batch.update(chapterCounterRef, {
            view_count: increment(1)
        })
        if(userId){
            const readHistoryRef = doc(this.constructor.db, 'users', userId, 'read_history', this.parentId)
            const chapterRef = doc(this.constructor.db, 'comics', this.parentId, 'chapters', this.id)
            batch.set(readHistoryRef, {
                chapters: arrayUnion(chapterRef)
            }, { merge: true })
        }

        return batch.commit()
        // return await updateDoc(chapterCounterRef, {
        //     view_count: increment(1)
        // }).then((res) => {
        //     if(userId){
        //         return setDoc(readHistoryRef, {
        //             chapters: arrayUnion(chapterRef)
        //         }, { merge: true })
        //     }else{
        //         return res
        //     }
        // })
    }

    async getPages(queries = []){
        const path = ['comics', this.parentId, 'chapters', this.id, 'pages']
        this.pages = await Page.getDocuments(path, queries)
        return this.pages
    }

    async getPagesWithSignedUrl(queries = []){
        // const rightNow = new Date()
        // const thirtyMinutes = new Date((new Date).getTime() + 1000 * 60 * 29)
        // let pagesCache = JSON.parse(localStorage.getItem('pagesCache') || '{}')

        // const updateCache = (signedUrls) => {
        //     pagesCache[this.parentId] = {
        //         ...pagesCache[this.parentId],
        //         [this.id]: {
        //             expire: thirtyMinutes,
        //             data: { ...signedUrls }
        //         }
        //     }
        //     localStorage.setItem('pagesCache', JSON.stringify(pagesCache))
        // }

        let goFunc = (pages) => {
            // const getSignedUrl = httpsCallable(fb.functions, 'fetchChapterResourcesSignedUrl-fetchChapterResourcesSignedUrl')
            // return getSignedUrl({
            //     comicId: this.parentId, 
            //     chapterId: this.id
            // }).then((signedUrls) => {
            return signedUrlFetchers.chapterResourcesSignedUrlsFetcher({ comicId: this.parentId, chapterId: this.id }).then((signedUrls) => {
                // updateCache(signedUrls.data)
                return pages.map((page) => {
                    page.unsecured_page_image_url = page.page_image_url
                    page.page_image_url = signedUrls.data[page.id]
                    return page
                })
            }).catch(console.error)
        }

        // if(pagesCache[this.parentId]?.[this.id]){
        //     const expired = new Date(pagesCache[this.parentId][this.id].expire)
        //     if(expired > rightNow){
        //         goFunc = (pages) => {
        //             return pages.map(page => {
        //                 page.page_image_url = pagesCache[this.parentId][this.id].data[page.id]
        //                 return page
        //             })
        //         }
        //     }
        // }
        const path = ['comics', this.parentId, 'chapters', this.id, 'pages']
        this.pages = await Page.getDocuments(path, queries)
            .then(goFunc)
            .catch((err) => {
                console.error(err)
                //do error handling here
            })
        // this.pages = await Page.getDocuments(path, queries).then((pages) => {
        //     const getSignedUrl = httpsCallable(fb.functions, 'fetchChapterResourcesSignedUrl-fetchChapterResourcesSignedUrl')
        //     return getSignedUrl({
        //         comicId: this.parentId, 
        //         chapterId: this.id
        //     }).then((signedUrls) => {
        //         return pages.map((page) => {
        //             page.page_image_url = signedUrls[page.id]
        //             return page
        //         })
        //     })
        // })
        return this.pages
    }
}