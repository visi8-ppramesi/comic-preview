import Collection from "./Collection";
import utils from "./utils";

export default class extends Collection{
    static collection = 'settings'
    static fields = {
        'value': Object
    }

    static async getSocials(){
        return await this.getDocument('socials')
    }

    static async getBanners(){
        const banners = await this.getDocument('banners')

        for(let i = 0; i < banners.value.length; i++){
            if(banners.value[i].type === 'image'){
                banners.value[i].banner_image_url = await utils.getDataUrlFromStorage(banners.value[i].banner_image_url)
            }
        }

        return banners
    }
}