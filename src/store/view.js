import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import errorHandler from "./utils/errorHandler";
// import _ from 'lodash'
import isNil from 'lodash/isNil'
import includes from 'lodash/includes'

const storageComicsViewed = localStorage.getItem('comics_viewed')
const storageChaptersViewed = localStorage.getItem('chapters_viewed')
const storageDateViewed = localStorage.getItem('view_date')

const viewHelper = (id, comic, store) => {
    try{
        return comic.viewComic().then(() => {
            store.comics_viewed.push(id)
            store.view_date[id] = new Date()
            localStorage.setItem('comics_viewed', JSON.stringify(store.comics_viewed))
            localStorage.setItem('view_date', JSON.stringify(store.view_date))
        })
    }catch(err){
        errorHandler(err)
    }
}

const viewChapterHelper = (id, chapter, store) => {
    const authStore = useAuthStore()
    try{
        return chapter.viewChapter(authStore.uid).then(() => {
            store.chapters_viewed.push(id)
            localStorage.setItem('chapters_viewed', JSON.stringify(store.chapters_viewed))
        })
    }catch(err){
        errorHandler(err)
    }
}

export const useViewStore = defineStore('comicViewed', {
    state: () => ({
        comics_viewed: isNil(storageComicsViewed) ? [] : JSON.parse(storageComicsViewed),
        view_date: isNil(storageDateViewed) ? {} : JSON.parse(storageDateViewed),
        chapters_viewed: isNil(storageChaptersViewed) ? [] : JSON.parse(storageChaptersViewed)
    }),
    
    getters: {},

    actions: {
        viewChapter(chapterInstance){
            const id = chapterInstance.id
            if(!includes(this.chapters_viewed, id)){
                return viewChapterHelper(id, chapterInstance, this)
            }
        },
        viewComic(comicInstance){
            const id = comicInstance.id
            if(!includes(this.comics_viewed, id)){
                if(!(id in this.view_date)){
                    return viewHelper(id, comicInstance, this)
                }/*else{
                    const viewDate = new Date(this.view_date[id])
                    if(viewDate < comicInstance.last_update.toDate()){
                        return viewHelper(id, comicInstance, this)
                    }
                }*/
            }else{
                const viewDate = new Date(this.view_date[id])
                if(viewDate < comicInstance.last_update.toDate()){
                    return viewHelper(id, comicInstance, this)
                }
            }
            return false
        }
    }
})