import Subcollection from "../Subcollection";
import { addDoc, doc, collection, onSnapshot, query, orderBy, limit, deleteDoc } from "firebase/firestore";
import handleError from "@/utils/handleError";
import { InstanceProjection, ProfilePicture } from '../types/index.js'
// import firebase from '../firebase.js'
// import User from "../users/User";

export default class extends Subcollection{
    static collection = 'comments'
    static fields = {
        'user': Subcollection.resolve('../users/User.js'),
        'user_data': new InstanceProjection({
            'name': String,
            'id': String,
            'profile_image_url': ProfilePicture
        }),
        'message': String,
        'flag': Number,
        'created_date': Date
    }

    async deleteComment(){
        try{
            const comRef = doc(this.constructor.db, 'comics', this.parentId, 'comments', this.id)
            return await deleteDoc(comRef)
        }catch(err){
            handleError(err, 'deleteCommentError')
            throw err
        }
    }

    static async createNewCommentListener(comicId, callback){
        const commentConstructor = (snap) => {
            if(!snap.empty){
                const data = snap.docs[0].data()
                const instance = new this()
                const parentId = comicId
                instance.setData(parentId, snap.docs[0].id, data, snap.docs[0]).then(() => {
                    callback(instance)
                })
            }
        }
        const collRef = collection(this.db, 'comics', comicId, 'comments')
        return onSnapshot(query(collRef, orderBy('created_date', 'desc'), limit(1)), commentConstructor)
    }

    static async addComment(comicId, msg, user){
        const userRef = doc(this.db, 'users', user.id)
        const userData = {
            id: userRef,
            name: user.name,
            profile_image_url: user.profile_image_url
        }
        const commRef = collection(this.db, 'comics', comicId, 'comments')
        return await addDoc(commRef, {
            user: userRef,
            user_data: userData,
            message: msg,
            flag: 0,
            created_date: new Date()
        })
    }
}