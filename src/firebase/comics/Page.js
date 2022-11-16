// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Subcollection from '../Subcollection.js'
import { collection, getDocs } from 'firebase/firestore'
// import { httpsCallable } from 'firebase/functions';
// import fb from '../firebase.js'
import signedUrlFetchers from '@/utils/signedUrlFetcher'

export default class extends Subcollection{
    static collection = 'pages'
    static fields = {
        'page_number': Number,
        'page_image_url': String,
        'video_poster': String,
        'is_ar': Boolean,
        'config': Object,
        'media_type': String,
        'scenes': Subcollection.resolve('./Scenes.js'),
        'scenes_data': Array,
        'ar_button_show_time': Object,
        'extras': String,
        'async_component': String,
        'comic_viewer_points': Array
    }

    async getScenes(){
        const { path } = this.getObjectPath()
        const sceneDoc = collection(this.constructor.db, 'comics', path.comics, 'chapters', path.chapters, 'pages', path.pages, 'scenes')
        return await getDocs(sceneDoc)
    }

    async getSignedImageUrl(){
        const { path } = this.getObjectPath()
        // const getSignedUrl = httpsCallable(fb.functions, 'fetchPageResourceSignedUrl-fetchPageResourceSignedUrl')
        // const signedUrl = (await getSignedUrl({
        //     comicId: path.comics, 
        //     chapterId: path.chapters,
        //     pageId: path.pages
        // })).data
        const signedUrl = (await signedUrlFetchers.pageResourceSignedUrlFetcher({ comicId: path.comics, chapterId: path.chapters, pageId: path.pages })).data
        this.page_image_url = signedUrl
        return signedUrl
    }
}