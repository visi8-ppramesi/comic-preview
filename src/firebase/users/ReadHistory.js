import Subcollection from "../Subcollection.js";
// import Comic from "../comics/Comic";
// import Chapter from "../comics/Chapter";

export default class extends Subcollection{
    static collection = 'read_history'
    static fields = {
        'comic': Subcollection.resolve('../comics/Comic.js'),
        'chapters': [ Subcollection.resolve('../comics/Chapter.js'), ]
    }
}