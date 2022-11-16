const env = require('dotenv').config().parsed

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore"); 
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getStorage } = require('firebase/storage')

const firebaseConfig = {
    apiKey: env.VUE_APP_API_KEY,
    authDomain: env.VUE_APP_AUTH_DOMAIN,
    projectId: env.VUE_APP_PROJECT_ID,
    storageBucket: env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: env.VUE_APP_MESSAGING_SENDER_ID,
    appId: env.VUE_APP_APP_ID,
    measurementId: env.VUE_APP_MEASUREMENT_ID,
};

const settings = {
    counterShardNum: 10
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const storage = getStorage(app)
const signInPromise = signInWithEmailAndPassword(auth, env.VUE_APP_ADMIN_EMAIL, env.VUE_APP_ADMIN_PASSWORD)

module.exports = { app, db, auth, storage, signInPromise, settings }