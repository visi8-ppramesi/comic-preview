import Collection from "../Collection.js"
import Subcollection from "../Subcollection.js"
// import Comic from "../comics/Comic.js";
// import Chapter from "../comics/Chapter.js";
import Order from "./Order.js";
import firebase from '../firebase.js';
import utils from "../utils/index.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, updateEmail, updatePassword as authUpdatePassword, reauthenticateWithCredential, EmailAuthProvider, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, linkWithPopup } from "firebase/auth";
import { 
    // collection, 
    startAfter, 
    getDocs, 
    runTransaction, 
    updateDoc, 
    getDoc, 
    doc, 
    setDoc, 
    onSnapshot, 
    arrayUnion, 
    arrayRemove, 
    increment, 
    // query, 
    orderBy, 
    limit, 
    writeBatch,
    collection,
    query
} from "firebase/firestore";
import PurchasedComic from "./PurchasedComic.js";
import { ProfilePicture } from "../types/index.js";
// import _ from 'lodash';
import isEqual from 'lodash/isEqual';
import handleError from "@/utils/handleError.js";
import ComicNotification from '../notifications/Comic.js'

const validateUserProfileData = (data) => {
    const acceptedFields = ['name', 'full_name']
    if (!isEqual(Object.keys(data).sort(), acceptedFields.sort())) {
        return false
    }
    return data
}

const fillData = (dataObject, email) => {
    dataObject.bookmarks = []
    dataObject.favorites = []
    dataObject.comic_subscriptions = []
    dataObject.profile_image_url = null
    dataObject.email = email
}

export default class extends Collection {
    static collection = 'users'
    static orderByParam = 'name'
    static fields = {
        'email': String,
        'name': String,
        'full_name': String,
        'purchased_comics': Subcollection.resolve('./PurchasedComic.js'),
        'read_history': Subcollection.resolve('./ReadHistory.js'),
        'orders': Subcollection.resolve('./Order.js'),
        'favorites': Array,
        'bookmarks': Array,
        'receipts': Subcollection.resolve('./Receipt.js'),
        'comic_subscriptions': Array,
        'email_verified_at': Date,
        'profile_image_url': ProfilePicture,
        'date_of_birth': Date
    }

    async getOrders(){
        return Order.getDocuments(['users', this.id, 'orders'], [orderBy('created_date', 'desc')])
    }

    async getPurchasedComics(startAfterParam = null){
        const comicsColl = collection(this.constructor.db, 'users', this.id, 'purchased_comics')
        let comicsQuery
        if(startAfterParam){
            comicsQuery = query(comicsColl, orderBy('chapters'), limit(10), startAfter(startAfterParam))
        }else{
            comicsQuery = query(comicsColl, orderBy('chapters'), limit(10))
        }
        
        return getDocs(comicsQuery).then((snap) => {
            const docs = Object.values(snap.docs)
            return docs.reduce((acc, v) => {
                acc[v.id] = v.get('chapters')
                return acc
            }, {})
        })

        // const promises = Object.values(comics.docs).map((comicDoc) => {
        //     const comicPromise = Comic.getDocumentWithStorageResourceUrl(comicDoc.id, ['cover_image_url'])
        //     const chaptersPromises = comicDoc.get('chapters').map((cpt) => {
        //         return Chapter.getDocument(['comics', comicDoc.id, 'chapters'], cpt.id)
        //     })
        //     return Promise.all([comicPromise, Promise.all(chaptersPromises)])
        // })

        // return Promise.all(promises)
    }

    async bestowComic(comicId, chapterIds){
      const chaptersPurchased = await this.getPurchasedComicStatus(comicId)
      if(chaptersPurchased.chapters.includes('all')){
        return
      }
      if(chapterIds.includes('all')){
        chaptersPurchased.chapters.push('all')
      }else{
        const allChapters = [...new Set([...chapterIds, ...chaptersPurchased.chapters.map(v => v.id)])]
        chaptersPurchased.chapters = allChapters.map((c) => {
          return doc(this.constructor.db, 'comics', comicId, 'chapters', c)
        })
      }

      if(chaptersPurchased.empty){
        chaptersPurchased.setDocumentReference(['users', this.id, 'purchased_comics', comicId])
      }
      return chaptersPurchased.saveDocument()
    }

    async getRoles(){
        const roleRef = doc(this.constructor.db, 'user_roles', this.id)
        const roleDoc = await getDoc(roleRef)

        return roleDoc.get('roles')
    }

    async setData(id, data, doc = null, authProvider = 'email'){
        await super.setData(id, data, doc)
        this.authProvider = authProvider
    }

    async unsubscribeComic(id) {
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)
        return await updateDoc(userRef, {
            comic_subscriptions: arrayRemove(comicRef)
        })
    }

    async subscribeComic(id) {
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)
        return await updateDoc(userRef, {
            comic_subscriptions: arrayUnion(comicRef)
        })
    }

    async unfavoriteComic(id) {
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)

        try {
            return await runTransaction(this.constructor.db, async (transaction) => {
                transaction.update(comicRef, { favorite_count: increment(-1) });
                transaction.update(userRef, { favorites: arrayRemove(comicRef) })
            });
        } catch (error) {
            handleError(error, 'favoriteError')
            throw error
        }
        // const incrementPromise = updateDoc(comicRef, {
        //     favorite_count: decrement(1)
        // })
        // const updatePromise = updateDoc(userRef, {
        //     favorites: arrayRemove(comicRef)
        // })
        // return await Promise.all([updatePromise, incrementPromise])
    }

    async favoriteComic(id) {
        const comicRef = doc(this.constructor.db, 'comics', id)
        const userRef = doc(this.constructor.db, 'users', this.id)

        try {
            return await runTransaction(this.constructor.db, async (transaction) => {
                transaction.update(comicRef, { favorite_count: increment(1) });
                transaction.update(userRef, { favorites: arrayUnion(comicRef) })
            });
        } catch (error) {
            handleError(error, 'favoriteError')
            throw error
        }
        // const incrementPromise = updateDoc(comicRef, {
        //     favorite_count: increment(1)
        // })
        // const updatePromise = updateDoc(userRef, {
        //     favorites: arrayUnion(comicRef)
        // })
        // return await Promise.all([updatePromise, incrementPromise])
    }

    async getPurchasedComicStatus(id) {
        const purchasedInstance = await PurchasedComic.getDocument(['users', this.id, 'purchased_comics'], id)
        if (purchasedInstance.empty) {
            purchasedInstance.chapters = []
        }
        return purchasedInstance
    }

    async purchaseChapter(comicId, chapterId) {
        const purchaseRef = doc(this.constructor.db, 'users', this.id, 'purchased_comics', comicId)
        const chapterRef = doc(this.constructor.db, 'comics', comicId, 'chapters', chapterId)
        return getDoc(purchaseRef).then((snap) => {
            if (snap.exists()) {
                return updateDoc(purchaseRef, {
                    chapters: arrayUnion(chapterRef)
                })
            } else {
                return setDoc(purchaseRef, {
                    chapters: arrayUnion(chapterRef)
                })

            }
        })
    }

    async createNotificationListener(listenerFunc){
        if (!firebase.auth.currentUser) {
            return null
        }
        const noteNotificationRef = doc(this.constructor.db, 'notifications', this.id)
        return onSnapshot(noteNotificationRef, listenerFunc)
    }

    async clearNotificationCount(notifications){
        if (!firebase.auth.currentUser) {
            return null
        }
        // const promises = []
        const batch = writeBatch(this.constructor.db)
        const countNotificationRef = doc(this.constructor.db, 'notifications', this.id)
        batch.update(countNotificationRef, {
            unread_count: 0
        })
        // const update = updateDoc(countNotificationRef, {
        //     unread_count: 0
        // })
        // promises.push(update)
        notifications.forEach((notification) => {
            if(notification.unread){
                // promises.push(notification.setRead())
                notification.setReadBatched(batch)
            }
        })
        return await batch.commit()

        // return Promise.allSettled(promises)
    }

    async getNotificationUnreadCount(){
        if (!firebase.auth.currentUser) {
            return 0
        }
        const noteNotificationRef = doc(this.constructor.db, 'notifications', this.id)
        const noteDoc = await getDoc(noteNotificationRef)
        if(noteDoc.exists()){
            return noteDoc.data().unread_count ?? 0
        }else{
            return 0
        }
    }

    async getNotifications(type = 'comics', limitParam = 10, startAfterParam = null){
        let queryObj
        if(startAfterParam){
            queryObj = [orderBy('created_date', 'desc'), limit(limitParam), startAfter(startAfterParam)]
        }else{
            queryObj = [orderBy('created_date', 'desc'), limit(limitParam)]
        }

        return (await ComicNotification.getDocuments(type, ['notifications', this.id, type], queryObj)).map((ins) => {
            ins.type = type
            return ins
        })
    }

    async getProfileImage() {
        if (this.profile_image_url) {
            this.profile_image_url = await utils.getResourceUrlFromStorage(this.profile_image_url)
            return this.profile_image_url
        } else {
            return null
        }
    }

    async updateDateOfBirth(date){
        return updateDoc(this.doc.ref, {
            date_of_birth: date
        })
    }

    async updateProfileData({ email, name, full_name }) {
        const update = {}
        if (name) {
            update.name = name
        }
        if (full_name) {
            update.full_name = full_name
        }
        if (firebase.auth.currentUser.email !== email) {
            await updateEmail(firebase.auth.currentUser, email)
            update.email = email
        }
        return await updateDoc(this.doc.ref, update)
    }

    async updatePassword(oldPassword, newPassword) {
        const cred = EmailAuthProvider.credential(this.email, oldPassword)
        return await reauthenticateWithCredential(firebase.auth.currentUser, cred).then(() => {
            return authUpdatePassword(firebase.auth.currentUser, newPassword)
        })

    }

    static getCurrentUser() {
        return firebase.auth.currentUser
    }

    static onAuthStateChanged(func) {
        firebase.auth.onAuthStateChanged(func)
    }

    static async login(email, password) {
        const data = await signInWithEmailAndPassword(firebase.auth, email, password).then(async (cred) => {
            const newUserDocRef = doc(this.db, 'users', cred.user.uid)
            const newProfile = await getDoc(newUserDocRef)
            return { profile: newProfile.data(), cred: cred, id: cred.user.uid, doc: newProfile }
        }).catch((err) => {
            handleError(err, 'loginError')
            throw err
        })

        const instance = new this()
        await instance.setData(data.id, data.profile, data.doc, 'email')
        return instance
    }

    static async register(email, password, userData) {
        const validatedUserData = validateUserProfileData(userData)
        if (!validatedUserData) {
            throw 'validator error'
        }
        fillData(validatedUserData, email)
        let newUser, newUserDocRef
        const data = await createUserWithEmailAndPassword(firebase.auth, email, password).then((promisedNewUser) => {
            updateProfile(promisedNewUser, {
                displayName: userData.name
            })
            newUser = promisedNewUser
            newUserDocRef = doc(this.db, 'users', promisedNewUser.user.uid)
            return setDoc(newUserDocRef, validatedUserData)
            // try{
            //     const newProfile = await setDoc(newUserDocRef, validatedUserData)
            //     return {profile: newProfile.data(), cred: newUser, id: newUser.user.uid, doc: newUserDocRef}
            // }catch(err){
            //     handleError(err)
            //     throw err
            // }
        }).then((newProfile) => {
            return { profile: validatedUserData, cred: newUser, id: newUser.user.uid, doc: newProfile }
        }).catch((err) => {
            handleError(err, 'registerError')
            throw err
        })

        const instance = new this()
        await instance.setData(data.id, data.profile, data.doc, 'email')
        return instance

        // .then((userDoc) => {
        //     //do something
        //     return userDoc
        // })
    }

    static async logout() {
        const { currentUser } = firebase.auth

        if (currentUser) {
            return await signOut(firebase.auth)
        }
    }

    // static async getNotification(followingParents, startAtParam = 0, endAtParam = 10) {
    //     if (!firebase.auth.currentUser) {
    //         return []
    //     }
    //     const feedRef = collection(firebase.db, 'feed')
    //     const queriedFeedRef = query(feedRef, where('parent', 'in', followingParents), startAt(startAtParam), endAt(endAtParam), orderBy('created_date', 'asc'))
    //     return await getDocs(queriedFeedRef)
    // }

    // static async createNotificationListener(followingParents, func) {
    //     if (!firebase.auth.currentUser) {
    //         return () => { }
    //     }
    //     const feedRef = collection(firebase.db, 'feed')
    //     const queriedFeedRef = query(feedRef, where('parent', 'in', followingParents))
    //     return onSnapshot(queriedFeedRef, func)
    // }

    static async loginWithGoogle() {
        const gAuthProvider = new GoogleAuthProvider()
        const result = await signInWithPopup(firebase.auth, gAuthProvider)
        const additionalInfo = getAdditionalUserInfo(result)
        let data
        if (additionalInfo.isNewUser) {
            const email = result.user.email
            const name = email.split('@')[0]
            const userData = {
                name, full_name: name
            }
            fillData(userData, email)
            const newUserDocRef = doc(this.db, 'users', result.user.uid)
            data = await setDoc(newUserDocRef, userData).then((newProfile) => {
                return { profile: userData, cred: result, id: result.user.uid, doc: newProfile }
            })
        } else {
            const newUserDocRef = doc(this.db, 'users', result.user.uid)
            data = await getDoc(newUserDocRef).then((newProfile) => {
                return { profile: newProfile.data(), cred: result, id: result.user.uid, doc: newProfile }
            })
        }

        const instance = new this()
        await instance.setData(data.id, data.profile, data.doc, 'google')
        return instance
    }

    async linkToGoogle(){
        const gAuthProvider = new GoogleAuthProvider()
        try{
            const result = await linkWithPopup(firebase.auth.currentUser, gAuthProvider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            this.authProvider = 'google'
            return { credential, user }
        }catch(error){
            handleError(error, 'linkError')
            throw error
        }
    }
}