const { getDocs, collection, getDoc, setDoc, addDoc, doc } = require('firebase/firestore')
const { db, signInPromise } = require('../firebase.js')

signInPromise.then(() => {
    const authorsData = [
        {
            'name': 'Widi Krisna Widodo',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'She is the writer of Galeo. She has been writing for 10 years.',
            'user_id': null
        },
        {
            'name': 'Azroi Hafidz',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'He is the writer of Galeo. He has been writing for 10 years.',
            'user_id': null
        },
        {
            'name': 'Fauzan Alwinta',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'He is the writer of Galeo. He has been writing for 10 years.',
            'user_id': null
        }
    ]
    
    const comicData = {
        'title': 'Galeo',
        'view_count': 0,
        'favorite_count': 0,
        'release_date': new Date(),
        'last_update': new Date(),
        'description': 'Galeo is afraid to participate in the Ikiro Trials, a dangerous rite-of-passage that makes children of the seas into mighty seawalkers. In a freak accident which destrys the temple trials, Galeo cannot complete the trials, resulting in his family getting banished and his father  missing. In their exile, Galeo’s younger sister, Adeleo runs away from home to chase sea-ghosts, which she believes can bring her to their father. Although scared, Galeo goes after Adeleo braving the open seas and dangerous sea-forests. Along his journey, Galeo is forced to face his pas-demons and overcome natural challenges identical to those of the Ikiro Trials.',
        'tags': [ 'children', 'scifi', 'fantasy' ],
        'categories': [ 'scifi', 'fantasy' ],
        'cover_image_url': 'gs://comics-77200.appspot.com/covers/galeo-cover.jpg',
        'is_draft': false,
        // 'authors': authorRefs,
        // 'authors_data': authorData
    }
    
    const chapterData = (cpt) => ({
        'chapter_number': cpt,
        'release_date': new Date(),
        'chapter_preview_url': 'gs://comics-77200.appspot.com/previews/galeo_cpt1_preview.jpg',
        'view_count': 0,
        'price': 0,
        'ar_price': false,
    })

    const comicId = 'xFpjBfVeF4d1XSBQexKV'

    const pages = [
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_1.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_2.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_3.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_4.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_5.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_6.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_7.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_8.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_9.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_10.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_11.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_12.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_13.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_14.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_15.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_16.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_17.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_18.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_19.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_20.jpg',
        'gs://comics-77200.appspot.com/comics/xFpjBfVeF4d1XSBQexKV/chapter_1/galeo_chapter_21.jpg',
    ]
    
    const main = async () => {
        const authorsRef = collection(db, 'authors')
        const authorRefs = []
        const authorData = []
        const result = []
        for(let i = 0; i < authorsData.length; i++){
            const newDoc = await addDoc(authorsRef, authorsData[i])
            authorRefs.push(newDoc)
            authorData.push({
                id: newDoc.id,
                name: authorsData[i]['name']
            })
            result.push(newDoc)
        }
        comicData.authors = authorRefs
        comicData.authors_data = authorData
    
        const comicRef = doc(db, 'comics', comicId)
        const newComicDoc = await setDoc(comicRef, comicData)
        result.push(newComicDoc)
    
        const cptRef = collection(db, 'comics', comicId, 'chapters')
        const newChapterDoc = await addDoc(cptRef, chapterData(1))
        result.push(newChapterDoc)
    
        const mp4Test = /\.mp4/
        const arTest = /_AR/
        const pageData = pages.map((pageUrl, idx) => {
            return {
                'page_number': idx,
                'page_image_url': pageUrl,
                'is_ar': arTest.test(pageUrl),
                'config': {},
                'media_type': mp4Test.test(pageUrl) ? 'video' : 'image'
            }
        })
    
        const pgRef = collection(db, 'comics', comicId, 'chapters', newChapterDoc.id, 'pages')
    
        for(let k = 0; k < pageData.length; k++){
            const newPageDoc = await addDoc(pgRef, pageData[k])
            result.push(newPageDoc)
        }

        for(let i = 0; i < 10; i++){
            const comicCountRef = doc(db, 'comics', comicId, 'counters', i.toString())
            const comicCounter = await setDoc(comicCountRef, {
                view_count: 0
            })
            result.push(comicCounter)
        }

        for(let i = 0; i < 10; i++){
            const chapterCountRef = doc(db, 'comics', comicId, 'chapters', newChapterDoc.id, 'counters', i.toString())
            const chapterCounter = await setDoc(chapterCountRef, {
                view_count: 0
            })
            result.push(chapterCounter)
        }
    
        return result
    }
    
    main().then((res) => {
        console.log(res)
        process.exit(0)
    })
})