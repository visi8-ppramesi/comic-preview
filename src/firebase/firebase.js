import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getFunctions } from "firebase/functions";
import {
    browserLocalPersistence,
    getAuth, 
    setPersistence
} from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getPerformance } from "firebase/performance";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// import _ from 'lodash'
// import dotenv from 'dotenv'

// const weTesting = process.env.TEST == 'true'

let envVar
// if(weTesting){
//     envVar = dotenv.config().parsed
// }else{
    envVar = process.env
// }

const firebaseConfig = {
    apiKey: envVar.VUE_APP_API_KEY,
    authDomain: envVar.VUE_APP_AUTH_DOMAIN,
    projectId: envVar.VUE_APP_PROJECT_ID,
    storageBucket: envVar.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: envVar.VUE_APP_MESSAGING_SENDER_ID,
    appId: envVar.VUE_APP_APP_ID,
    measurementId: envVar.VUE_APP_MEASUREMENT_ID,
    defaultProfilePicture: 'gs://comics-77200.appspot.com/default_profile.jpeg'
};

const buildGsPath = (fullPath) => {
    const baseArray = ('gs://' + firebaseConfig.storageBucket).split('/')
    baseArray.push(...fullPath.split().filter(v => v.length > 0))
    return baseArray.join('/')
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app)
const functions = getFunctions(app, 'asia-east2')
const performance = getPerformance(app)

// if(process.env.NODE_ENV == "development"){
//     self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.VUE_APP_APPCHECK_DEBUG_TOKEN;
// }
// const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6LcdV4ghAAAAAGT8x3ghDtIliODpgtyejRy87RR2'),

//     // Optional argument. If true, the SDK automatically refreshes App Check
//     // tokens as needed.
//     isTokenAutoRefreshEnabled: true
// });

setPersistence(auth, browserLocalPersistence)

export default {app, db, auth, storage, analytics, performance, firebaseConfig, functions, buildGsPath};