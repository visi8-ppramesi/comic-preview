const { faker } = require('@faker-js/faker')
const UserFactory = require('./users.js')
const Factory = require('./factory.js')

module.exports = class AuthorFactory extends Factory{
    static collectionName = 'authors'

    static async createData(){
        return {
            'name': faker.name.firstName() + ' ' + faker.name.lastName(),
            'email': faker.internet.email(),
            'social_media_links': { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
            'description': faker.lorem.paragraph(5),
            'profile_picture_url': 'gs://comics-77200.appspot.com/alan_moore.jpg',
            'user_id': await UserFactory.getRandomReference()
        }
    }
}