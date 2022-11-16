<template>
    <div class="flex w-full h-full">
        <img :src="bgSrc" class="absolute w-full h-full object-cover" />
        <div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white">
            <img style="margin-right: 40px;margin-left: 40px;width: calc(100vw - 80px);max-width: 900px;" v-show="imgSrc" :src="imgSrc" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'seventh-tiger-banner',
    data(){
        return {
            bgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/banners%2Fseventh_tiger_banner.jpg?alt=media&token=1af6119f-83ec-4bcf-8126-777621e22539',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/banners%2Fseventh-toger-logo.png?alt=media&token=bd6eea9b-aa3b-4d1a-a35b-1f124376ee48',
        }
    }
}
</script>