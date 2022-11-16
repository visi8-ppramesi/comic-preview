import Collection from "./Collection";

export default class extends Collection{
    static collection = 'tags'
    static fields = {
        'name': String
    }
}