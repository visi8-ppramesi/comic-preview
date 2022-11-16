// import axios from 'axios'
import Midtrans from './MidtransCharger.js'
// import emitter from '@/utils/emitter.js'
import { httpsCallable } from 'firebase/functions'
import fb from '../firebase/firebase.js'

export default class extends Midtrans{
    static cardFields = [
        "card_number",
        "card_exp_month",
        "card_exp_year",
        "card_cvv",
        "OTP",
        "3DS"
    ]

    constructor(clientKey, envType){
        super(clientKey, envType)
        this.tokenData = null
        this.tokenError = null
    }
    
    setTokenData(tokenData){
        if(tokenData.status_code == '200'){
            this.tokenData = tokenData
            return tokenData
        }else{
            throw 'Credit card token error ' + tokenData.status_code + ': ' + tokenData.status_message
        }
    }

    buildUrl(cardData, callbackStr, path = null){
        let urlObject
        if(path){
            urlObject = new URL(path, this.baseUrl)
        }else{
            urlObject = new URL(this.baseUrl)
        }

        urlObject.searchParams.append('callback', callbackStr)
        urlObject.searchParams.append('client_key', this.clientKey)

        this.constructor.cardFields.forEach((field) => {
            if(cardData[field]){
                urlObject.searchParams.append(field, cardData[field])
            }
        })

        return urlObject.toString()
    }

    async getCardToken(cardData){
        const globalSetTokenDataName = 'globalSetTokenData_' + (Math.random() + 1).toString(36).substring(2)

        window[globalSetTokenDataName] = (tokenData) => {
            if(tokenData.status_code == '200'){
                this.tokenData = tokenData
                return tokenData
            }else{
                this.tokenError = tokenData
                throw 'Credit card token error ' + tokenData.status_code + ': ' + tokenData.status_message
            }
        }

        const url = this.buildUrl(cardData, globalSetTokenDataName, '/v2/token')

        var embedscript = document.createElement("script");
        /** @type {string} */
        embedscript.src = url;
        document.getElementsByTagName("head")[0].appendChild(embedscript);

        return new Promise((resolve, reject) => {
            let i = 0
            const interval = setInterval(() => {
                if(this.tokenData){
                    clearInterval(interval)
                    resolve(this.tokenData)
                }else if(i == 100){
                    clearInterval(interval)
                    reject(this.tokenError)
                }
                i++
            }, 10)
        })

        // const tokenCode = "'use strict';" + (await axios.get(url).then(v => v.data))
        // return eval(tokenCode)
    }

    async registerCard(cardData){
        const globalSetTokenDataName = 'globalSetTokenData_' + (Math.random() + 1).toString(36).substring(2)

        window[globalSetTokenDataName] = (tokenData) => {
            if(tokenData.status_code == '200'){
                this.tokenData = tokenData
                return tokenData
            }else{
                this.tokenError = tokenData
                throw 'Credit card token error ' + tokenData.status_code + ': ' + tokenData.status_message
            }
        }

        const url = this.buildUrl(cardData, globalSetTokenDataName, '/v2/card/register')

        var embedscript = document.createElement("script");
        /** @type {string} */
        embedscript.src = url;
        document.getElementsByTagName("head")[0].appendChild(embedscript);

        return new Promise((resolve, reject) => {
            let i = 0
            const interval = setInterval(() => {
                if(this.tokenData){
                    clearInterval(interval)
                    resolve(this.tokenData)
                }else if(i == 100){
                    clearInterval(interval)
                    reject(this.tokenError)
                }
                i++
            }, 10)
        })
    }

    async createComicCharge({comicData, user}, cardData){
        const token = await this.getCardToken(cardData)
            .then((response) => {
                return response
            }).catch(() => {
                return this.registerCard(cardData).then((response) => {
                    return response
                }).catch((err) => {
                    throw err
                })
            })
        
        const createCreditCardCharge = httpsCallable(fb.functions, 'createComicCreditCardCharge-createComicCreditCardCharge')
        const { total, tax, fee } = await this.constructor.calculateTax(comicData.price)

        const creditCardDetails = {
            statusCode: token.status_code,
            statusMessage: token.status_message,
            tokenId: token.token_id,
            hash: token.hash
        }
        const param = this.constructor.buildParamComic(comicData, user, total, tax, fee, { creditCardDetails })
        return createCreditCardCharge(param)
    }

    async createChapterCharge({chapterData, comicData, user}, cardData){
        const token = await this.getCardToken(cardData)
            .then((response) => {
                return response
            }).catch(() => {
                return this.registerCard(cardData).then((response) => {
                    return response
                }).catch((err) => {
                    throw err
                })
            })
        
        const createCreditCardCharge = httpsCallable(fb.functions, 'createChapterCreditCardCharge-createChapterCreditCardCharge')
        const { total, tax, fee } = await this.constructor.calculateTax(chapterData.price)

        const creditCardDetails = {
            statusCode: token.status_code,
            statusMessage: token.status_message,
            tokenId: token.token_id,
            hash: token.hash
        }
        const param = this.constructor.buildParamChapter(chapterData, comicData, user, total, tax, fee, { creditCardDetails })
        return createCreditCardCharge(param)

        // .catch(() => {
        //     return this.registerCard(cardData).then((token) => {
        //         return token
        //     }).catch((err) => {
        //         throw err
        //     })
        // })

        // const createCreditCardCharge = httpsCallable(fb.functions, 'createChapterCreditCardCharge-createChapterCreditCardCharge');
        // const { total, tax, fee } = await this.constructor.calculateTax(chapterData.price)

        // const creditCardDetails = {
        //     statusCode: token.status_code,
        //     statusMessage: token.status_message,
        //     tokenId: token.token_id,
        //     hash: token.hash
        // }
        // const param = this.constructor.buildParam(chapterData, comicData, user, total, tax, fee, { creditCardDetails })
        // return createCreditCardCharge(param)
    }
}