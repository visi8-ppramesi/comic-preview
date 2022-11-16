const { faker } = require('@faker-js/faker')
const Factory = require('./factory.js')

module.exports = class CategoryFactory extends Factory{
    static collectionName = 'categories'

    static async createData(){
        return {
            'name': _.toLower(faker.music.genre()),
        }
    }
}