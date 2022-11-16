const { faker } = require('@faker-js/faker')
const ComicFactory = require('./comics.js')
const Factory = require('./factory.js')
const UserFactory = require('./users.js')
const { addDoc, collection, doc } = require('firebase/firestore')

module.exports = class CommentFactory extends Factory{
    static collectionName = 'comments'

    static async createData(){
        const user = await UserFactory.getRandomDoc()
        const userDatum = user.data()
        const userRef = doc(this.db, 'users', user.id)
        const userData = {
            id: userRef,
            name: userDatum.name,
            profile_image_url: userDatum.profile_image_url
        }

        return {
            'user': userRef,
            'user_data': userData,
            'message': faker.lorem.paragraph(10),
            'flag': 0,
            'date': new Date()
        }
    }

    static async createDoc(){
        const data = await this.createData()
        const comic = await ComicFactory.getRandomDoc()
        return await addDoc(collection(this.db, 'comics', comic.id, this.collectionName), data)
    }
}