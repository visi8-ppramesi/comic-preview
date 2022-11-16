const { faker } = require('@faker-js/faker')
const Factory = require('./factory.js')
const UserFactory = require('./users.js')


module.exports = class TagFactory extends Factory{
    static collectionName = 'user_types'

    static async createData(){
        return {
            'user': UserFactory.getRandomReference,
            'type': ['user']
        }
    }
}