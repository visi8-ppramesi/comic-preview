<template>
    <div class="flex w-full h-full">
        <img :src="bgSrc" class="absolute w-full h-full object-cover" />
        <div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white">
            <img style="margin-right: 40px;margin-left: 40px;width: calc(100vw - 80px);max-width: 700px;max-height: calc(100% - 40px);" v-show="imgSrc" :src="imgSrc" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'galeo-banner',
    data(){
        return {
            bgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/banners%2Fgaleo-banner-background.jpg?alt=media&token=5eb22357-cc90-4e2f-8001-90c9c5ed8616',
            imgSrc: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/banners%2Fgaleo-banner-logo.png?alt=media&token=23cd4f90-ee66-4de3-842c-62f28618c3f1',
        }
    }
}
</script>