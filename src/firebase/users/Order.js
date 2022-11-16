import Subcollection from "../Subcollection.js";
// import Comic from "../comics/Comic";

export default class extends Subcollection{
    static collection = 'orders'
    static fields = {
        'chapters': Number,
        'status': String,
        'total_amount': Number,
        'order_id': String,
        'created_date': Date,
        'type': String,
        'items': Array,
        'notification_response': Object,
        'charge_response': Object
    }
}