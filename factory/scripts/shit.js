const fb = require('../firebase.js')
const _ = require('lodash')
const ComicFactory = require('../comics.js')
const ChapterFactory = require('../chapters.js')
const { ref, listAll, updateMetadata } = require('firebase/storage')
const { getDocs, getDoc, doc, updateDoc, collection, increment, addDoc, collectionGroup, where, query, FieldPath, orderBy, limit, setDoc } = require('firebase/firestore')

// let one = true
// const huh = {
//     latin: true,
//     soul: true,
// }

// const genres = {
//     'folk': 'horror',
//     'latin': 'scifi',
//     'hip hop': 'superhero',
//     'stage and screen': 'fantasy',
//     'blues': 'horror',
//     'metal': 'scifi',
//     'classical': 'superhero',
//     'children': 'children',
//     'scifi': 'scifi',
//     'fantasy': 'fantasy'
// }
///comics/SSb0da8HXyie7DbcAEve/chapters/gJH0dBqsv28Xl9IStvcm
const main = async () => {
    await fb.signInPromise
    // const comicCollection = collection(ComicFactory.db, 'comics')
    // await getDocs(comicCollection).then((snap) => {
    //     snap.forEach((docRes) => {
    //         const data = docRes.data()
    //         const authors = data['authors_data'].map(v => v.name).reduce((acc, v) => {
    //             const authArray = v.split(' ')
    //             acc.push(...authArray)
    //             return acc
    //         }, [])
    //         const tags = data['tags']
    //         const categories = data['categories']
    //         const title = data['title'].split(' ')

    //         const keywords = [...new Set([...authors, ...tags, ...categories, ...title].map(_.toLower))]
    //         // console.log(keywords)
    //         updateDoc(docRes.ref, {
    //             keywords
    //         })
    //     })
    // })
    // console.log('done')
    const comicColl = collection(fb.db, 'users', 'VOibHVLCulhx3eSHeuFSx9aDqQj2', 'purchased_comics')
    const comicSnap = await getDocs(comicColl)
    const promises = Object.values(comicSnap.docs).map((comic) => {
        const promises = comic.get('chapters').map((chapter) => {
            return getDoc(chapter).then(v => v.data())
        })

        return Promise.all(promises)
    })

    const chapters = await Promise.all(promises)
    console.log(chapters)

    // const noteDoc = doc(fb.db, 'notifications', 'VOibHVLCulhx3eSHeuFSx9aDqQj2')
    // const stuff = await setDoc(noteDoc, {
    //     unread_count: increment(1)
    // }, { merge: true })
    // console.log(stuff)

    // const col = doc(fb.db, 'test', '123', 'asdf', '234')
    // const set = await setDoc(col, {
    //     test: 'test'
    // })

    // for(let i = 0; i < 10; i++){
    //     const chapterCountRef = doc(fb.db, 'comics', 'SSb0da8HXyie7DbcAEve', 'chapters', 'gJH0dBqsv28Xl9IStvcm', 'counters', i.toString())
    //     const chapterCounter = await setDoc(chapterCountRef, {
    //         view_count: 0
    //     })
    // }
    // const comicColl = collection(ComicFactory.db, 'comics')
    // const comicSnap = await getDocs(comicColl)
    // const comicDocs = Object.values(comicSnap.docs)
    // for(let i = 0; i < comicDocs.length; i++){
    //     const comicDoc = comicDocs[i]
    //     const chapterColl = collection(ComicFactory.db, 'comics', comicDoc.id, 'chapters')
    //     const chapterSnap = await getDocs(chapterColl)
    //     const chapterDocs = Object.values(chapterSnap.docs)
    //     const comicCptData = []
    //     for(let j = 0; j < chapterDocs.length; j++){
    //         const chapterDoc = chapterDocs[j]
    //         const chapterData = chapterDoc.data()
    //         const chapterDataObj = {
    //             id: chapterDoc.id, 
    //             chapter_number: chapterData.chapter_number, 
    //             chapter_preview_url: chapterData.chapter_preview_url, 
    //             release_date: chapterData.release_date, 
    //             view_count: chapterData.view_count,
    //             price: chapterData.price
    //         }
    //         comicCptData.push(chapterDataObj)

    //         // for(let k = 0; k < 10; k++){
    //         //     const cptViewCountDoc = doc(ComicFactory.db, 'comics', comicDoc.id, 'chapters', chapterDoc.id, 'counters', k.toString())
    //         //     await setDoc(cptViewCountDoc, {
    //         //         view_count: 0
    //         //     })
    //         // }
    //     }
    //     await updateDoc(doc(ComicFactory.db, 'comics', comicDoc.id), {
    //         chapters_data: comicCptData
    //     })
    // }

    // await fb.signInPromise
    // const NS_PER_SEC = 1e9;
    // const MS_PER_NS = 1e-6  
    // const time = process.hrtime();
    // const collGroup = collectionGroup(ComicFactory.db, 'comments')
    // const docSnap = await getDocs(collGroup)
    // const docs = Object.values(docSnap.docs)
    // // const aggregated = {}
    // for(let j = 0; j < docs.length; j++){
    //     const data = docs[j].ref.path.split('/')
    //     console.log(data)
    //     // docs[j].get('view_count')
    //     // const comicId = path[1]
    //     // if(aggregated[comicId]){
    //     //     aggregated[comicId] += docs[j].get('view_count')
    //     // }else{
    //     //     aggregated[comicId] = docs[j].get('view_count')
    //     // }
    // }
    // const comicIds = Object.keys(aggregated)
    // for(let i = 0; i < comicIds.length; i++){
    //     const comicRef = doc(ComicFactory.db, 'comics', comicIds[i])
    //     await updateDoc(comicRef, {
    //         view_count: aggregated[comicIds[i]]
    //     })
    // }
    // const diff = process.hrtime(time);
    // console.log(`Benchmark took ${ (diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS } milliseconds`);
    // const comicsCollection = collection(ComicFactory.db, 'comics')
    // const comicSnaps = await getDocs(comicsCollection)
    // const comicDocs = Object.values(comicSnaps.docs)
    // for(let j = 0; j < comicDocs.length; j++){
    //     for(let i = 0; i < 10; i++){
    //         const subdocRef = doc(ComicFactory.db, 'comics', comicDocs[j].id, 'counters', i.toString())
    //         await setDoc(subdocRef, { view_count: 0 })
    //     }
    //     await updateDoc(comicDocs[j], { view_count: 0 })
    // }
    // await fb.signInPromise
    // const comicsCollection = collection(ComicFactory.db, 'comics')
    // getDocs(comicsCollection).then((snap) => {
    //     console.log(snap.size)
    // })
    // const snap = await getDocs(comicsCollection)
    // const comicDocs = Object.values(snap.docs)
    // for(let i = 0; i < comicDocs.length; i++){
    //     const comicDoc = comicDocs[i]
    //     const tags = comicDoc.data().tags
    //     await updateDoc(comicDoc.ref, {
    //         categories: tags
    //     })

        // const comicCptData = []
        // const cptCollection = collection(ComicFactory.db, 'comics', comicDoc.id, 'chapters')
        // const cptSnap = await getDocs(cptCollection)
        // const cptDocs = Object.values(cptSnap.docs)
        // for(let j = 0; j < cptDocs.length; j++){
        //     const cptDoc = cptDocs[j]
        //     const chapter_number = cptDoc.data().chapter_number
        //     const id = cptDoc.id
        //     const cptData = { id, chapter_number }
        //     comicCptData.push(cptData)
        // }
        // if(comicCptData.length > 0){
        //     await updateDoc(comicDoc.ref, { chapters_data: comicCptData })
        // }
    // }
}

main()
// fb.signInPromise.then(() => {
//     const comicsCollection = collection(ComicFactory.db, 'comics')
//     getDocs(comicsCollection).then((snap) => {
//         snap.forEach((comicDoc) => {
//             const comicCptData = []
//             const cptCollection = collection(ComicFactory.db, 'comics', comicDoc.id, 'chapters')
//             getDocs(cptCollection).then((cptSnap) => {
//                 cptSnap.forEach((cptDoc) => {
//                     const chapter_number = cptDoc.data().chapter_number
//                     const id = cptDoc.id
//                     const cptData = { id, chapter_number }
//                 })
//             })
//         })
//     })
    // const listRef = ref(fb.storage, '')
    // listAll(listRef).then((res) => {
    //     res.prefixes.forEach((prefix) => {
    //         listAll(prefix).then((innerRes) => {
    //             innerRes.prefixes.forEach((prefix) => {
    //                 listAll(prefix).then((innerInnerRes) => {
    //                     innerInnerRes.items.forEach((item) => {
    //                         updateMetadata(item, {
    //                             cacheControl: 'public,max-age=86400'
    //                         })
    //                     })
    //                 })
    //             })

    //             innerRes.items.forEach((item) => {
    //                 updateMetadata(item, {
    //                     cacheControl: 'public,max-age=86400'
    //                 })
    //             })
    //         })
    //     })

    //     res.items.forEach((item) => {
    //         updateMetadata(item, {
    //             cacheControl: 'public,max-age=86400'
    //         })
    //     })
    // })
    // const counts = {}
    // const usersRef = collection(ComicFactory.db, 'users')
    // getDocs(usersRef).then((snap) => {
    //     snap.forEach((doc) => {
    //         const data = doc.data()
    //         data.favorites.forEach((comic) => {
    //             console.log(comic)
    //             if(counts[comic.id]){
    //                 counts[comic.id]++
    //             }else{
    //                 counts[comic.id] = 1
    //             }
    //         })
    //     })
    //     Object.keys(counts).forEach((comicId) => {
    //         const comicRef = doc(ComicFactory.db, 'comics', comicId)
    //         updateDoc(comicRef, {
    //             favorite_count: counts[comicId]
    //         }).then((updateComic) => {
    //             console.log(updateComic)
    //         })
    //     })
    // })
    // const comicCollection = collection(ComicFactory.db, 'comics')
    // const q = query(comicCollection, 
    //     ...Object.keys(huh).map((key) => {
    //         return where(new FieldPath('keywords', key), '==', true),
    //         orderBy('name'),
    //         limit(10)
    //     })    // await fb.signInPromise
    // const NS_PER_SEC = 1e9;
    // const MS_PER_NS = 1e-6  
    // const time = process.hrtime();
    // const collGroup = collectionGroup(ComicFactory.db, 'counters')
    // const docSnap = await getDocs(collGroup)
    // const docs = Object.values(docSnap.docs)
    // const aggregated = {}
    // for(let j = 0; j < docs.length; j++){
    //     // docs[j].get('view_count')
    //     const path = docs[j].ref.path.split('/')
    //     const comicId = path[1]
    //     if(aggregated[comicId]){
    //         aggregated[comicId] += docs[j].get('view_count')
    //     }else{
    //         aggregated[comicId] = docs[j].get('view_count')
    //     }
    // }
    // const comicIds = Object.keys(aggregated)
    // for(let i = 0; i < comicIds.length; i++){
    //     const comicRef = doc(ComicFactory.db, 'comics', comicIds[i])
    //     await updateDoc(comicRef, {
    //         view_count: aggregated[comicIds[i]]
    //     })
    // }
    // const diff = process.hrtime(time);
    // console.log(`Benchmark took ${ (diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS } milliseconds`);
    // )

    // const q = query(comicCollection, where('keywords', 'array-contains-all', ['kara', 'guardian', 'realms']))
    // getDocs(q).then((snap) => {
    //     if(snap.empty){
    //         console.log('not found')
    //     }else{
    //         snap.forEach((docRes) => {
    //             console.log(docRes.data())
    //         })
    //     }
    // })
    // getDoc(doc(ComicFactory.db, 'authors', 'EZ7uQtb2V3wU4asdfasdfasdfzxcvzxczxcvrQ1fG9J')).then((snap) => {
    //     console.log(snap.exists())
    // })
// })

// fb.signInPromise.then(() => {
//     getDocs(collectionGroup(ComicFactory.db, 'pages')).then((pageSnap) => {
//         pageSnap.forEach((pageDoc) => {
//             updateDoc(pageDoc.ref, {
//                 media_type: 'image'
//             })
//         })
//     })
//     // getDocs(collection(ComicFactory.db, 'comics')).then((snapComic) => {
//     //     snapComic.forEach((docComic) => {
//     //         getDocs(collection(ComicFactory.db, 'comics', docComic.id, 'chapters')).then((snapChapter) => {
//     //             snapChapter.forEach((docChapter) => {
//     //                 getDocs(collection(ComicFactory.db, 'comics', docComic.id, 'chapters', docChapter.id, 'pages')).then((snapPage) => {
//     //                     snapPage.forEach((docPage) => {
//     //                         updateDoc(docPage.ref, {
//     //                             type: 'image'
//     //                         })
//     //                     })
//     //                 })
//     //             })
//     //         })
//     //     })
//     // })
// })

// fb.signInPromise.then(() => {
//     getDocs(collection(ComicFactory.db, 'comics')).then((snap) => {
//         snap.forEach((doc) => {
//             const data = doc.data()
//             updateDoc(doc.ref, { 
//                 tags: data['tags'].map(_.toLower),
//                 categories: data['categories'].map(_.toLower),
//             }) 
//         }) 
//     })
// })

// fb.signInPromise.then(() => {
    // getDocs(collection(ChapterFactory.db, 'comics')).then((snap) => {
    //     snap.forEach((doc) => {
    //         getDocs(collection(ChapterFactory.db, 'comics', doc.id, 'chapters')).then((cptSnap) => {
    //             cptSnap.forEach((cptDoc) => {
    //                 updateDoc(cptDoc.ref, {
    //                     view_count: increment(1)
    //                 })
    //             })
    //         })
            // const data = doc.data()
            // updateDoc(doc.ref, { 
            //     tags: data['tags'].map(_.toLower),
            //     categories: data['categories'].map(_.toLower),
            // }) 
        // }) 
    // })
// })