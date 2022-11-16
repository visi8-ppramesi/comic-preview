const fb = require('../firebase.js')
const _ = require('lodash')
const ComicFactory = require('../comics.js')
const ChapterFactory = require('../chapters.js')
// const { ref, listAll, updateMetadata } = require('firebase/storage')
const { getDocs, getDoc, doc, updateDoc, collection, increment, addDoc, collectionGroup, where, query, FieldPath, orderBy, limit, setDoc, ref } = require('firebase/firestore')

const commentUserDataFields = ['id', 'name', 'profile_image_url']

const main = async () => {
    await fb.signInPromise
    const userColl = collection(ComicFactory.db, 'users')
    const userSnaps = await getDocs(userColl)
    const userDocs = Object.values(userSnaps.docs)
    const promises = []
    for(let i = 0; i < userDocs.length; i++){
        const data = userDocs[i].data()
        const userData = commentUserDataFields.reduce((acc, v) => {
            if(v == 'id'){
                acc[v] = doc(ComicFactory.db, 'users', userDocs[i].id)
            }else{
                acc[v] = data[v]
            }
            
            return acc
        }, {})


        const commentsColl = query(collectionGroup(ComicFactory.db, 'comments'), where('user', '==', userDocs[i].ref))
        const commentsSnaps = await getDocs(commentsColl)
        const commentsDocs = Object.values(commentsSnaps.docs)
        for(let j = 0; j < commentsDocs.length; j++){
            // console.log(commentsDocs[j].ref)
            promises.push(updateDoc(commentsDocs[j].ref, {
                user_data: userData
            }))
        }
    }

    await Promise.all(promises)
    console.log('done')
}

main()