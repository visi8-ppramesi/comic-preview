// import firebase from '../firebase.js'
// import settings from '../firebaseSettings.js'
import Collection from '../Collection.js'
import Subcollection from '../Subcollection.js'
import Chapter from './Chapter.js'
import Comment from './Comment.js'
import { LongText, InstanceProjectionArray, StorageLink } from '../types/index.js'
import { doc, increment, orderBy, updateDoc } from 'firebase/firestore'
import utils from '../utils/index.js'
import firebaseSettings from '../firebaseSettings.js'

export default class extends Collection{
    static collection = 'comics'
    static orderByParam = 'title'
    static fields = {
        'title': String,
        'view_count': Number,
        'favorite_count': Number,
        'release_date': Date,
        'authors': [ Collection.resolve('../Author.js') ],
        // 'authors_data':	Array,
        'authors_data': new InstanceProjectionArray({
            id: String,
            name: String,
            profile_picture_url: String
        }),
        'price': Number,
        // 'authors_split': Subcollection,
        'comments':	Subcollection.resolve('./Comment.js'),
        'description': LongText,
        'chapters':	Subcollection.resolve('./Chapter.js'),
        'tags':	Array,
        'categories': Array,
        'cover_image_url': StorageLink,
        'cover_image_url_landscape': String,
        'is_draft':	Boolean,
        // 'chapters_data': Array,
        'last_update': Date,
        'chapters_data': new InstanceProjectionArray({
            id: String, 
            chapter_number: Number, 
            chapter_preview_url: StorageLink, 
            release_date: Date, 
            view_count: Number, 
            price: Number,
            hidden: Boolean
        }),
        'age_gate': Boolean
    }

    async viewComic(){
        const counterIndex = Math.floor(Math.random() * firebaseSettings.counterShardNum).toString()
        const comicRef = doc(this.constructor.db, 'comics', this.id, 'counters', counterIndex)
        return await updateDoc(comicRef, {
            view_count: increment(1)
        })
    }

    async getChapters(queries = []){
        const path = [this.constructor.collection, this.id, 'chapters']
        queries.push(orderBy('chapter_number'))
        this.chapters = await Chapter.getDocuments(path, queries)
        return this.chapters
    }

    async getChaptersWithStorageResource(queries = []){
        const path = [this.constructor.collection, this.id, 'chapters']
        queries.push(orderBy('chapter_number'))
        this.chapters = await Chapter.getDocumentsWithStorageResource(path, queries, ['chapter_preview_url'])
        return this.chapters
    }

    async getComments(queries = []){
        const path = [this.constructor.collection, this.id, 'comments']
        this.comments = await Promise.all((await Comment.getDocuments(path, queries)).map(async (doc) => {
            doc.user_data.profile_image_url = await utils.getDataUrlFromStorage(doc.user_data.profile_image_url)
            return doc
        }))
        return this.comments
    }

    static async getComics(){
        const comics = await this.getDocuments()
        return comics
    }

    createNewCommentListener(callback){
        return Comment.createNewCommentListener(this.id, callback)
    }
}