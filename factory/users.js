const { faker } = require('@faker-js/faker')
const { createUserWithEmailAndPassword } = require('firebase/auth')

const { auth } = require('./firebase.js')
const Factory = require('./factory.js')
const { setDoc, doc } = require('firebase/firestore')

module.exports = class UserFactory extends Factory{
    static collectionName = 'users'

    static async createData(){
        return {
            'name': faker.name.firstName() + ' ' + faker.name.lastName(),
            'email': faker.internet.email(),
            'password': '123qweasd',
            'favorites': [],
            'bookmarks': [],
            'tokens': 0,
            'comic_subscriptions': [],
            'email_verified_at': new Date(),
            'profile_image_url': 'gs://comics-77200.appspot.com/alan_moore.jpg'
        }
    }

    static async createDoc(){
        const data = await this.createData()
        let userUid
        const settedDoc = await createUserWithEmailAndPassword(auth, data['email'], data['password']).then((newUser) => {
            userUid = newUser.user.uid
            const newUserDocRef = doc(this.db, this.collectionName, newUser.user.uid)
            let validatedUserData = Object.assign({}, data)
            delete validatedUserData['password']
            return setDoc(newUserDocRef, validatedUserData)
        }).then(() => {
            console.log(userUid)
            const userRoleRef = doc(this.db, 'user_roles', userUid)
            return setDoc(userRoleRef, {roles: [ 'user' ]})
        })

        return await settedDoc
    }
}

// email	string
// name	string
// purchased_comics	subdoc
// read_history	subdoc
// favorites	array
// bookmarks	array
// tokens	number
// receipts	subdoc
// comics_subscriptions	array
// email_verified_at	date
// profile_image_url	string