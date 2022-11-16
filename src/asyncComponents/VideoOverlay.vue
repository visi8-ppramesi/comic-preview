<template>
    <div v-show="!showSelf">
        <div @click="openSelf" ref="extras" class="z-20 w-14 h-10 border-2 border-black bg-gray-200 bg-opacity-75 flex justify-center items-center rounded-md absolute left-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
        </div>
    </div>
    <Transition name="overlay">
        <div v-show="showSelf" style="transition:opacity 0.5s ease;background-color: rgba(0,0,0,0.55);z-index:99" ref="videoContainer" class="fixed top-0 left-0 h-screen w-screen flex justify-center justify-items-center content-center items-center">
            <div @click="closeSelf" class="opacity-1 z-20 w-8 h-8 flex bg-gray-200 bg-opacity-75 justify-center items-center rounded-full absolute left-2 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="absolute z-10 video-container">
                <video
                    class="video"
                    ref="videoElement"
                    playsinline loop
                    :src="source"
                    type="video/mp4">
                </video>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: 'video-overlay',
    data(){
        return {
            sourceRaw: 'https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/extras%2Fvideo_chapter_2_5.mp4?alt=media&token=ccec4178-f355-4908-ad8d-57941fcc65ba',
            source: null,
            showSelf: false
        }
    },
    created(){
        fetch(this.sourceRaw)
            .then(res => res.blob())
            .then(blob => {
                this.source = URL.createObjectURL(blob)
            })
    },
    methods: {
        openSelf(){
            this.showSelf = true
            this.$nextTick(() => {
                this.$refs.videoElement.play()
            })
        },
        closeSelf(){
            this.$refs.videoElement.pause()
            this.showSelf = false
        }
    }
}
</script>