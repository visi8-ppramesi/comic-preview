<template>
    <div v-if="showAr()" class="absolute w-full h-full">
        <div style="width: 15%;bottom: 33%;right: 35.2%;" class="absolute z-20 border-2 border-black bg-gray-200 bg-opacity-75 flex justify-center items-center rounded-md">
            <router-link 
                :to="{
                    name: 'Scene', 
                    params: {
                        comicId: 'SSb0da8HXyie7DbcAEve', 
                        chapterId: 'iHSdlIpPfPxDz2671OBQ', 
                        pageId: 'VELFSygVmK0dnGVEkmI7', 
                        sceneId: 'Nnu7IFGYP0AzR7wbC9hE'
                    }
                }"
            >
                <img class="w-full" :src="arButton()" />
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'kara-ar-button',
    methods: {
        arButton(){
            return window.imageManifest['img/ar_icon.svg']
        },
        showAr(){
            return this.canRunAr && this.detectMobile()
        },
    }
}
</script>