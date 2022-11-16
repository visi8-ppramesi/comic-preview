import Subcollection from '../Subcollection.js'

export default class extends Subcollection{
    static collection = 'scenes'
    static fields = {
        'scene_html': String,
        'ar_model_url': String,
    }
}