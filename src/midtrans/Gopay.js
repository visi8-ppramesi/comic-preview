import Midtrans from './MidtransCharger.js'
import { httpsCallable } from 'firebase/functions'
import fb from '../firebase/firebase.js'

export default class extends Midtrans{
    async createChapterCharge({chapterData, comicData, user}){
        const createGopayCharge = httpsCallable(fb.functions, 'createChapterGopayCharge-createChapterGopayCharge');
        const { total, tax, fee } = await this.constructor.calculateTax(chapterData.price)
        const param = this.constructor.buildParamChapter(chapterData, comicData, user, total, tax, fee)
        return createGopayCharge(param)
    }
    async createComicCharge({comicData, user}){
        const createGopayCharge = httpsCallable(fb.functions, 'createComicGopayCharge-createComicGopayCharge');
        const { total, tax, fee } = await this.constructor.calculateTax(comicData.price)
        const param = this.constructor.buildParamComic(comicData, user, total, tax, fee)
        return createGopayCharge(param)
    }
}