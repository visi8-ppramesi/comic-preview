export default class{
    static environment = {
        production : "https://api.midtrans.com",
        sandbox : "https://api.sandbox.midtrans.com",
        staging : "https://api.stg.veritrans.co.id"
    };

    constructor(clientKey, envType){
        if(!clientKey){
            throw 'Invalid client key'
        }
        if(!(envType in this.constructor.environment)){
            throw 'Environment type invalid'
        }
        this.clientKey = clientKey
        this.baseUrl = this.constructor.environment[envType]
    }

    static buildParamComic(comicData, user, total, tax, fee, extraParams = {}){
        return {
            transactionDetails: {
                grossAmount: total,
                tax, fee
            },
            itemsDetails: [{
                comicId: comicData?.id,
                comicName: comicData?.title,
                itemPrice: comicData?.price
            }],
            customerDetails: {
                userId: user?.id,
                email: user?.email,
                fullName: user?.full_name
            },
            ...extraParams
        }
    }

    static buildParamChapter(chapterData, comicData, user, total, tax, fee, extraParams = {}){
        return {
            transactionDetails: {
                grossAmount: total,
                tax, fee
            },
            itemsDetails: [{
                chapterId: chapterData?.id,
                comicId: comicData?.id,
                chapterNum: chapterData?.chapter_number, 
                comicName: comicData?.title,
                itemPrice: chapterData?.price
            }],
            customerDetails: {
                userId: user?.id,
                email: user?.email,
                fullName: user?.full_name
            },
            ...extraParams
        }
    }

    static async calculateTax(price, currency = 'IDR'){
        if(currency == 'IDR'){
            const taxRate = 0.11 //change later into settings
            const tax = Math.round(price * taxRate)
            const fee = 0 //change later into settings
            return { total: Math.round(price + tax + fee), tax, fee }
        }else{
            const taxRate = 0.11 //change later into settings
            const tax = price * taxRate
            const fee = 0 //change later into settings
            return { total: price + tax + fee, tax, fee }
        }
    }
}