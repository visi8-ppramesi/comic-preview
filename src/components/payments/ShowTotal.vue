<template>
    <div class="flex flex-col md:flex-col">
        <template v-if="chapterData === 'all'">
            <img class="h-24 w-24 object-cover max-w-24" :src="comicData?.cover_image_url" alt="">
            <div class="flex flex-col">
                <div id="comic-title">
                    {{this.comicData?.title}}
                </div>
                <div id="item-price">
                    Rp. {{this.comicData?.price}}
                </div>
            </div>
        </template>
        <template v-else>
            <div class="flex justify-center pt-3">
                <img class="h-28 w-20 lg:h-56 lg:w-48 object-cover max-w-24 rounded-md" :src="chapterData?.chapter_preview_url" alt="">
                <div class="flex flex-col px-3">
                    <div class="font-bold text-sm lg:text-xl" id="comic-title ">
                        {{this.comicData?.title}}
                    </div>
                    <div class="text-xs lg:text-sm" id="chapter-number">
                        Chapter {{this.chapterData?.chapter_number}}
                    </div>
                </div>
            </div>
            
            <div class="font-bold pt-3 lg:text-lg">{{ $t("details") }}</div>
            <div class="text-xs lg:text-sm flex items-center justify-center">
                <div class="flex-grow">{{ $t("detailsDes") }}</div>
                <div>Rp {{this.chapterData?.price}}</div>
            </div>

            <div class="text-xs lg:text-sm flex items-center justify-center">
                <div class=" flex-grow">{{ $t("method") }}</div>
                <div>{{ $t("gopay") }}</div>
            </div>
        </template>
    </div>
</template>

<script>
const i18Texts = {
  messages: {
    en: {
        details: 'Details',
        detailsDes: 'Comic Price',
        detailsPrice: 'Rp. {this.chapterData?price}',
        method: 'Payment Method',
        gopay: 'Gopay'
    },
    id: {
        rincian: 'Rincian',
        detailsDes: 'Harga Komik',
        detailsPrice: 'Rp. {this.chapterData?price}',
        method: 'Metode Pembayaran',
        gopay: 'Gopay'
    }
  }
}

export default{
    name: 'show-total',
    i18n: i18Texts,
    props: [
        'comicData',
        'chapterData'
    ],
    mounted(){
    }
}
</script>

<style>

</style>