import { httpsCallable } from 'firebase/functions';
import fb from '../firebase/firebase.js'
import isNil from 'lodash/isNil'
import axios from 'axios'

export function functionsChapterResourcesSignedUrlsFetcher({ comicId, chapterId }){
    // console.log('functionsChapterResourcesSignedUrlsFetcher')
    const getSignedUrl = httpsCallable(fb.functions, 'fetchChapterResourcesSignedUrl-fetchChapterResourcesSignedUrl')
    return getSignedUrl({ comicId, chapterId })
}

export async function cloudRunChapterResourcesSignedUrlsFetcher({ comicId, chapterId }){
    // console.log('cloudRunChapterResourcesSignedUrlsFetcher')
    const cloudRunUrl = process.env.VUE_APP_CLOUDRUN_FETCHER_URL
    const cloudRunUrlObj = new URL(cloudRunUrl)
    cloudRunUrlObj.pathname = 'fetch-chapter-signed-urls'
    const currentUser = fb.auth.currentUser
    const config = {}
    if(!isNil(currentUser)){
        const tokenId = await currentUser.getIdToken(true)
        config.headers = {
            Authorization: `Bearer ${tokenId}`
        }
    }

    return axios.post(cloudRunUrlObj.toString(), { comicId, chapterId }, config).then(v => v.data)
}

export function functionsPageResourceSignedUrlFetcher({ comicId, chapterId, pageId }){
    // console.log('functionsPageResourceSignedUrlFetcher')
    const getSignedUrl = httpsCallable(fb.functions, 'fetchPageResourceSignedUrl-fetchPageResourceSignedUrl')
    return getSignedUrl({ comicId,  chapterId, pageId })
}

export async function cloudRunPageResourceSignedUrlFetcher({ comicId, chapterId, pageId }){
    // console.log('cloudRunPageResourceSignedUrlFetcher')
    const cloudRunUrl = process.env.VUE_APP_CLOUDRUN_FETCHER_URL
    const cloudRunUrlObj = new URL(cloudRunUrl)
    cloudRunUrlObj.pathname = 'fetch-page-signed-url'
    const currentUser = fb.auth.currentUser
    const config = {}
    if(!isNil(currentUser)){
        const tokenId = await currentUser.getIdToken(true)
        config.headers = {
            Authorization: `Bearer ${tokenId}`
        }
    }

    return axios.post(cloudRunUrlObj.toString(), { comicId, chapterId, pageId }, config).then(v => v.data)

}

const fetchers = {
    functions: {
        chapterResourcesSignedUrlsFetcher: functionsChapterResourcesSignedUrlsFetcher,
        pageResourceSignedUrlFetcher: functionsPageResourceSignedUrlFetcher
    },
    cloudRun: {
        chapterResourcesSignedUrlsFetcher: cloudRunChapterResourcesSignedUrlsFetcher,
        pageResourceSignedUrlFetcher: cloudRunPageResourceSignedUrlFetcher
    }
}

export default fetchers[process.env.VUE_APP_SIGNED_URL_FETCHER || 'functions']