const { faker } = require('@faker-js/faker')
const Factory = require('./factory.js')

module.exports = class ChapterFactory extends Factory{
    static collectionName = 'chapters'

    static async createData(cptNum){
        return {
            'chapter_number': cptNum,
            'release_date': new Date(),
            'chapter_preview_url': 'gs://comics-77200.appspot.com/cpt-prev.jpg',
            'view_count': 0,
            'price': 0,
            'ar_price': false,
        }
    }

    async createPages(){
        
    }
}