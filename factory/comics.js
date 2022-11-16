const { faker } = require('@faker-js/faker')
const { getDocs, collection, getDoc, setDoc, addDoc, doc, updateDoc, arrayUnion } = require('firebase/firestore')
const ChapterFactory = require('./chapters.js')
const PageFactory = require('./pages.js')
const Factory = require('./factory.js')
const AuthorFactory = require('./authors.js')
const TagFactory = require('./tags.js')
const CategoryFactory = require('./categories.js')
const { settings } = require('./firebase.js')
const _ = require('lodash')

module.exports = class ComicFactory extends Factory{
    static collectionName = 'comics'

    static async createData(){
        const authorRefs = []
        const authorData = []
        const authorsName = [] 
        for(let i = 0; i < 3; i++){
            const randDoc = await AuthorFactory.getRandomDoc()
            const data = randDoc.data()
            const docRef = doc(this.db, 'authors', randDoc.id)
            authorRefs.push(docRef)
            authorData.push({
                id: docRef,
                name: data['name'],
                profile_picture_url: data['profile_picture_url'],
            })
            authorsName.push(...data['name'].split(' '))
        }

        const tags = [ await TagFactory.getRandomValue('name'), await TagFactory.getRandomValue('name'), await TagFactory.getRandomValue('name') ]
        const categories = [ await CategoryFactory.getRandomValue('name'), await CategoryFactory.getRandomValue('name') ]
        const title = faker.hacker.noun()

        const keywords = [...new Set([...authorsName, ...tags, ...categories, ...title.split(' ')])].map(_.toLower)

        return {
            'title': title,
            'view_count': 0,
            'favorite_count': 0,
            'release_date': new Date(),
            'last_update': new Date(),
            'description': faker.lorem.paragraph(5),
            'tags': tags,
            'categories': categories,
            'cover_image_url': 'gs://comics-77200.appspot.com/cpt-prev.jpg',
            'is_draft': false,
            'authors': authorRefs,
            'authors_data': authorData,
            'keywords': keywords
        }
    }

    static async createComicsWithChaptersPages(comicNum, cptNum, pgNum){
        let docs = await this.createDocs(comicNum)
        const newCpts = []
        const newPages = []
        for(let i = 0; i < docs.length; i++){
            const doc = docs[i]
            for(let m = 0; m < settings.counterShardNum; m++){
                await setDoc(doc(this.db, 'comics', doc.id, 'counters', m.toString()), {
                    view_count: 0
                })
            }
            for(let k = 0; k < cptNum; k++){
                const newData = await ChapterFactory.createData(k + 1)
                const newDoc = await addDoc(collection(this.db, 'comics', doc.id, 'chapters'), newData)
                
                const newDocId = newDoc.id
                const updatedComic = await updateDoc(doc(this.db, 'comics', doc.id), {
                    chapters_data: arrayUnion({ id: newDocId, chapter_number: k + 1 })
                })

                for(let q = 0; q < settings.counterShardNum; q++){
                    await setDoc(doc(this.db, 'comics', doc.id, 'chapters', newDocId, 'counters', q.toString()), {
                        view_count: 0
                    })
                }
                for(let j = 0; j < pgNum; j++){
                    const newPageData = await PageFactory.createData(j + 1)
                    const newPageDoc = await addDoc(collection(this.db, 'comics', doc.id, 'chapters', newDoc.id, 'pages'), newPageData)
                    newPages.push(newPageDoc)
                }
                newCpts.push(newDoc)
            }
        }
    }
}