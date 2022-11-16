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
    name: 'changelings-banner',
    data(){
        return {
            bgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/banners%2Fbanner_compressed.jpg?alt=media&token=2c01c235-9a92-42f2-bec5-7b99b4be43d3',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/banners%2Fchangeling_textured_resized-fs8.png?alt=media&token=f41fda6e-5913-4796-80dd-c1d9749b9da0',
        }
    }
}
</script>