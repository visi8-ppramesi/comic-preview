import Collection from "../Collection.js";
import Subcollection from "../Subcollection.js"
import { updateDoc, doc } from "firebase/firestore";

export default class extends Subcollection{
    static collection = 'comics'
    static fields = {
        'comic': Collection.resolve('../comics/Comic.js'),
        'chapter': Subcollection.resolve('../comics/Chapter.js'),
        'created_date': Date,
        'unread': Boolean
    }

    static async getDocuments(type, path, queries = []){
        const instances = await super.getDocuments(path, queries)
        return instances.map((ins) => {
            ins.type = type
            return ins
        })
    }

    async setRead(){
        const noteNotificationRef = doc(this.constructor.db, 'notifications', this.parentId, this.type, this.id)
        return updateDoc(noteNotificationRef, {
            unread: false
        })
    }

    setReadBatched(batch){
        const noteNotificationRef = doc(this.constructor.db, 'notifications', this.parentId, this.type, this.id)
        batch.update(noteNotificationRef, {
            unread: false
        })
    }
}