import Collection from "../Collection.js";
import Subcollection from "../Subcollection.js"

export default class extends Collection{
    static collection = 'notifications'
    static fields = {
        'comics': Subcollection.resolve('./Comic.js'),
        'unread_count': Number,
    }
}