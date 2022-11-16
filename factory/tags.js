const { faker } = require('@faker-js/faker')
const _ = require('lodash')
const Factory = require('./factory.js')


module.exports = class TagFactory extends Factory{
    static collectionName = 'tags'

    static async createData(){
        return {
            'name': _.toLower(faker.music.genre()),
        }
    }
}