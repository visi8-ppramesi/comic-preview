import Collection from "./Collection";

export default class extends Collection{
    static collection = 'categories'
    static fields = {
        'name': String
    }

    static async getCategories(){
        const categories = await this.getDocuments()
        return categories
    }
}