import Collection from "./Collection";
import { orderBy, limit } from "firebase/firestore";

export default class extends Collection{
    static collection = 'news'
    static fields = {
        'title': String,
        'date': Date,
        'category': String,
        'image': String,
        'url': String
    }

    static async getNews(){
        const news = await this.getDocuments([ orderBy("date"), limit(3) ])
        return news
    }
}