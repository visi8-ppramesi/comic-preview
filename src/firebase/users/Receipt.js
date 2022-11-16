import Subcollection from "../Subcollection";

export default class extends Subcollection{
    static collection = 'receipts'
    static fields = {
        'created_date': Date,
        'total_amount': Number,
        'tax': Number,
        'discount': Number,
        'payment_method': String,
        'purchaser_name': String,
        'purchaser_address': Object,
        'items': Array,
        'transaction_id': String,
    }
}