const asyncComponentConvert = require('./vueCompiler.js')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const { doc, setDoc } = require('firebase/firestore')
const { path: filePath, name, print } = argv
const isNil = require('lodash/isNil')

const env = require('dotenv').config().parsed

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore"); 
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getStorage } = require('firebase/storage')

const emptyParams = []
const requiredParams = {
    filePath,
    name
}
const paramCheck = Object.keys(requiredParams).reduce((acc, v) => {
    if(isNil(requiredParams[v])) emptyParams.push(v);
    return acc || isNil(requiredParams[v])
}, false)
if(paramCheck){
    console.error('Missing parameters')
    emptyParams.forEach((v) => {
        if(v == 'filePath'){
            console.error(`  --path <path>`)
        }else{
            console.error(`  --${v} <${v}>`)
        }
    })
    process.exit(1)
}

const firebaseConfig = {
    apiKey: env.VUE_APP_API_KEY,
    authDomain: env.VUE_APP_AUTH_DOMAIN,
    projectId: env.VUE_APP_PROJECT_ID,
    storageBucket: env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: env.VUE_APP_MESSAGING_SENDER_ID,
    appId: env.VUE_APP_APP_ID,
    measurementId: env.VUE_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const storage = getStorage(app)
const signInPromise = signInWithEmailAndPassword(auth, env.VUE_APP_ADMIN_EMAIL, env.VUE_APP_ADMIN_PASSWORD)

//create a function that reads file
function readFile(filePathParam) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePathParam, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//create a function that parse vue file
async function parseVueFile() {
    const file = await readFile(filePath)
    const vueObject = await asyncComponentConvert(file)
    await signInPromise
    // console.log(params)
    const extrasRef = doc(db, 'async_components', name)
    if(!isNil(print) && print){
        console.log(vueObject)
        process.exit(0)
    }else{
        try{
            await setDoc(extrasRef, vueObject)
            process.exit(0)
        }catch(err){
            console.error(err)
            process.exit(1)
        }
    }
}

parseVueFile()