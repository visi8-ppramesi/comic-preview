const { faker } = require('@faker-js/faker')
const env = require('dotenv').config().parsed
const AuthorFactory = require('./authors.js')
const ComicFactory = require('./comics.js')
const CategoryFactory = require('./categories.js')
const TagFactory = require('./tags.js')
const UserFactory = require('./users.js')
const CommentFactory = require('./comments.js')


const main = async () => {
    console.log('tags')
    await TagFactory.createDocs(10)

    console.log('categories')
    await CategoryFactory.createDocs(10)

    console.log('users')
    await UserFactory.createDocs(10)

    console.log('authors')
    await AuthorFactory.createDocs(6)

    console.log('comics')
    await ComicFactory.createComicsWithChaptersPages(10, 5, 5)

    console.log('comments')
    await CommentFactory.createDocs(20)
}

main()