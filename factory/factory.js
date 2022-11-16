const { getDocs, collection, getDoc, setDoc, addDoc, doc } = require('firebase/firestore')
const { db } = require('./firebase.js')

module.exports = class Factory{
    static fields = {}
    static collectionName = ''
    static db = db

    static async createData(){
        return {}
    }

    static async createDoc(){
        const data = await this.createData()
        // for(const idx in data){
        //     const value = data[idx]
        //     if(value == ''){
        //         delete data[idx]
        //     }
        // }
        return await addDoc(collection(this.db, this.collectionName), data)
    }

    static async createDocs(instanceNum){
        const docs = []
        for(let i = 0; i < instanceNum; i++){
            await this.createDoc().then((docRes) => {
                docs.push(docRes)
            })
        }

        return docs
    }

    static async getRandomDoc(){
        const coll = collection(this.db, this.collectionName)
        const docs = await getDocs(coll)
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc)
        })

        return arr[Math.floor(Math.random() * arr.length)]
    }

    static async getRandomValue(field){
        const coll = collection(this.db, this.collectionName)
        const docs = await getDocs(coll)
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc.data()[field])
        })

        return arr[Math.floor(Math.random() * arr.length)]
    }

    static async getRandomReference(){
        const coll = collection(this.db, this.collectionName)
        const docs = await getDocs(coll)
        const arr = []
        docs.forEach((doc) => {
            arr.push(doc.id)
        })

        return doc(this.db, this.collectionName, arr[Math.floor(Math.random() * arr.length)])
    }
}