const { faker } = require('@faker-js/faker')
const Factory = require('./factory.js')
const AuthorFactory = require('./authors.js')

module.exports = class AuthorSplitFactory extends Factory{
    static collectionName = 'author_split'

    static async createData(){
        return {
            'author': AuthorFactory.getRandomReference(),
            'split': 0.5
        }
    }
}