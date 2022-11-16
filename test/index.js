// const assert = require('assert')
// const createInstance = require('./firebase/firebase.js')
// const { getDocs, collection, getDoc, doc } = require('firebase/firestore')
// const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require("firebase/auth")
// const env = require('dotenv').config().parsed
// const UserModel = require('../src/firebase/users/User.js')
// import Author from '../src/firebase/Author.js'
// import User from '../src/firebase/users/User.js'
// import Comic from '../src/firebase/comics/Comic.js'
// import Comment from '../src/firebase/comics/Comment.js'
// import firebase from '../src/firebase/firebase.js'
// import { signInWithEmailAndPassword } from 'firebase/auth'

// describe('Login', function(){
//     describe('Admin', async function(){
//         console.log(User.fields)
//         console.log(Author.fields)
//         console.log(Comic.fields)
//         const comics = await Comic.getDocuments()
//         console.log(comics)
//         // const { app, db, auth, storage } = createInstance()
//         // const user = await signInWithEmailAndPassword(auth, env.VUE_APP_ADMIN_EMAIL, env.VUE_APP_ADMIN_PASSWORD)
//     })
// })

// describe('Comments', function(){
//     describe('Login', async function(){
//         await signInWithEmailAndPassword(firebase.auth, 'ppramesi@gmail.com', '123qweasd')
//         Comment.getDocumentsCollection().then((docs) => {
//             console.log(docs)
//         })
//     })
// })