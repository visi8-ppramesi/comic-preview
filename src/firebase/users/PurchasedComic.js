import Subcollection from "../Subcollection.js";
// import Comic from "../comics/Comic";

export default class extends Subcollection{
    static collection = 'purchased_comics'
    static fields = {
        'chapters': Array
    }
}