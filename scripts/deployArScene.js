//node ./scripts/deployArScene.js --print --draco --cameraPos [1,2,3] --entityPos [0,0,0] --entityScale [1,1,1] --modelUrl gs://test.com/stuff/asdf.glb --comicId asdfzxcv --chapterId 124qesw --pageId qwerqwer --id test --animation stuff
//node ./scripts/deployArScene.js --id galeoAr --draco true --cameraPos [0,5,10] --entityPos [0,0,0] --entityScale [0.065,0.065,0.065] --modelUrl gs://comics-77200.appspot.com/models/galeo.glb --comicId xFpjBfVeF4d1XSBQexKV --chapterId ZTelu89CtbuAxC6sZd8Z --pageId 3nhwx7VBB7fnXFeWEouq --animation \*
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const { minify: htmlMinify } = require('html-minifier-terser')
const { doc, setDoc, addDoc, getDocs, collection, updateDoc } = require('firebase/firestore')
let { id, draco, cameraPos, entityPos, entityScale, modelUrl, comicId, chapterId, pageId, animation, print, ambient, light } = argv
const isNil = require('lodash/isNil')
const isEmpty = require('lodash/isEmpty')
const zipObject = require('lodash/zipObject')

const emptyParams = []
const requiredParams = {
    id,
    cameraPos, 
    entityPos, 
    entityScale, 
    modelUrl, 
    comicId, 
    chapterId, 
    pageId
}
const paramCheck = Object.keys(requiredParams).reduce((acc, v) => {
    if(isNil(requiredParams[v])) emptyParams.push(v);
    return acc || isNil(requiredParams[v])
}, false)
if(paramCheck){
    console.error('Missing parameters')
    emptyParams.forEach((v) => {
        console.error(`  --${v} <${v}>`)
    })
    process.exit(1)
}
if(isNil(light)){
    light = '0.7'
}
if(isNil(ambient)){
    ambient = '0.5'
}

let sceneStub
if(draco){
    sceneStub = fs.readFileSync(path.resolve(__dirname, 'stubs', 'SceneDraco.html.stub'), 'utf8');
}else{
    sceneStub = fs.readFileSync(path.resolve(__dirname, 'stubs', 'Scene.html.stub'), 'utf8');
}

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const storage = getStorage(app)
const signInPromise = signInWithEmailAndPassword(auth, env.VUE_APP_ADMIN_EMAIL, env.VUE_APP_ADMIN_PASSWORD)

const cleanUp = (html) => {
    // return html.replace(/\t/g, '').replace(/   /g, '').replace(/\n/g, '').replace(/\r/g, '').replace(/  /g, ' ')
    return htmlMinify(html, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        caseSensitive: true
    })
}

const replaceValues = (html, myId, { cameraX, cameraY, cameraZ }, { scaleX, scaleY, scaleZ }, { entityPosX, entityPosY, entityPosZ }, modelUrl = null) => {
    if(isNil(animation) || isEmpty(animation)){
        animation = ''
    }else{
        animation = `animation-mixer="clip: ${animation}; loop: repeat"`
    }
    let replaced = html
        .replace(/%%id%%/g, myId)
        .replace(/%%camera_position_x%%/g, cameraX)
        .replace(/%%camera_position_y%%/g, cameraY)
        .replace(/%%camera_position_z%%/g, cameraZ)
        .replace(/%%entity_scale_x%%/g, scaleX)
        .replace(/%%entity_scale_y%%/g, scaleY)
        .replace(/%%entity_scale_z%%/g, scaleZ)
        .replace(/%%entity_position_x%%/g, entityPosX)
        .replace(/%%entity_position_y%%/g, entityPosY)
        .replace(/%%entity_position_z%%/g, entityPosZ)
        .replace(/%%animation%%/g, animation)
        .replace(/%%ambient_light%%/g, ambient)
        .replace(/%%light_intensity%%/g, light)
    
    if(modelUrl){
        replaced = replaced.replace(/%%model_url%%/g, modelUrl)
    }

    return replaced
}
const main = async () => {
    const { cx, cy, cz } = zipObject(['cx', 'cy', 'cz'], JSON.parse(cameraPos))
    const { sx, sy, sz } = zipObject(['sx', 'sy', 'sz'], JSON.parse(entityScale))
    const { ex, ey, ez } = zipObject(['ex', 'ey', 'ez'], JSON.parse(entityPos))
    const sceneHtml = replaceValues(
        await cleanUp(sceneStub), 
        id,
        {
            cameraX: cx,
            cameraY: cy,
            cameraZ: cz
        },
        {
            scaleX: sx,
            scaleY: sy,
            scaleZ: sz
        },
        { 
            entityPosX: ex,
            entityPosY: ey,
            entityPosZ: ez
        }
    )
    if(isNil(print)){
        await signInPromise
    
        const pageDoc = collection(db, 'comics', comicId, 'chapters', chapterId, 'pages', pageId, 'scenes')
        const sceneDoc = await getDocs(pageDoc)
        if(sceneDoc.empty){
            const addedScene = await addDoc(pageDoc, {
                ar_model_url: modelUrl,
                scene_html: sceneHtml
            })
            const pageRef = doc(db, 'comics', comicId, 'chapters', chapterId, 'pages', pageId)
            await updateDoc(pageRef, {
                scenes_data: [addedScene.id]
            })
        }else{
            const sceneRef = doc(db, 'comics', comicId, 'chapters', chapterId, 'pages', pageId, 'scenes', sceneDoc.docs[0].id)
            await updateDoc(sceneRef, {
                ar_model_url: modelUrl,
                scene_html: sceneHtml
            })
        }
    }else{
        console.log(sceneHtml)
    }
}

main().then(() => {
    process.exit(0)
}).catch((err) => {
    console.error(err)
    process.exit(1)
})