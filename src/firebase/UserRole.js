import Collection from "./Collection";
// import User from "./users/User";

export default class extends Collection{
    static collection = 'user_roles'
    static fields = {
        'user': Collection.resolve('../users/User.js'),
        'types': Array
    }
}