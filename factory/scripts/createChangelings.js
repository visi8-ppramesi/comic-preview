const { getDocs, collection, getDoc, setDoc, addDoc, doc } = require('firebase/firestore')
const { db, signInPromise } = require('../firebase.js')

signInPromise.then(() => {

    const authorsData = [
        {
            'name': 'Changelings Author 1',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'She is the writer of Changelings. She has been writing for 10 years.',
            'user_id': null
        },
        {
            'name': 'Changelings Author 2',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'He is the writer of Changelings. He has been writing for 10 years.',
            'user_id': null
        },
        {
            'name': 'Changelings Author 3',
            'email': '',
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': 'He is the writer of Changelings. He has been writing for 10 years.',
            'user_id': null
        }
    ]
    
    const comicData = {
        'title': 'Changelings',
        'view_count': 0,
        'favorite_count': 0,
        'release_date': new Date(),
        'last_update': new Date(),
        'description': 'Changelings description',
        'tags': [ 'children', 'scifi', 'fantasy' ],
        'categories': [ 'scifi', 'fantasy' ],
        'cover_image_url': 'gs://comics-77200.appspot.com/covers/changelings-cover.jpg',
        'is_draft': false,
        // 'authors': authorRefs,
        // 'authors_data': authorData
    }
    
    const chapterData = (cpt) => ({
        'chapter_number': cpt,
        'release_date': new Date(),
        'chapter_preview_url': 'gs://comics-77200.appspot.com/previews/changelings_cpt1_preview.jpg',
        'view_count': 0,
        'price': 0,
        'ar_price': false,
    })

    const comicId = 'C92HPPzTxMzlV7i5gE5b'

    const pages = [
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_1.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_2.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_3.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_4.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_5.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_6.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_7.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_8.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_9.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_10.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_11.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_12.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_13.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_14.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_15.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_16.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_17.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_18.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_19.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_20.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_21.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_22.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_23.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_24.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_25.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_26.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_27.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_28.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_29.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_30.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_31.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_32.jpg',
        'gs://comics-77200.appspot.com/comics/C92HPPzTxMzlV7i5gE5b/chapter_1/changeling_chapter_33.jpg',
    ]

    // const pages = [
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_1.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_2_AR.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_3.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_4.mp4',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_5.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_6.mp4',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_7.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_8.mp4',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_9.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_10.mp4',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_11.mp4',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_12.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_13_AR.jpg',
    //     'gs://comics-77200.appspot.com/comics/SSb0da8HXyie7DbcAEve/web_comic_14.mp4',
    // ]
    

    // const pages = [
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_2.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_3.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_4-5.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_6.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_7.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_8.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_9.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_10.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_11.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_12.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_13.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_14.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_15.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_16.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_17.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_18.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_19.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_20.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_21.mp4',
    //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_24.mp4',
    // ]
    
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
    })
})