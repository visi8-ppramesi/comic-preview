const { faker } = require('@faker-js/faker')
const Factory = require('./factory.js')

module.exports = class PageFactory extends Factory{
    static collectionName = 'pages'

    static async createData(pageNum){
        return {
            'page_number': pageNum,
            'page_image_url': 'gs://comics-77200.appspot.com/page.jpg',
            'is_ar': false,
            'config': {},
            'type': 'video'
        }
    }
}