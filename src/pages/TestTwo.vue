<template>
    <button id="test" @click="test">test</button>
</template>

<script>
// import { markRaw } from 'vue'
import fb from '../firebase/firebase.js'
// import { httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
// import StepperComponent from '../components/stepper/StepperComponent.vue'
// import StepOne from '../components/stepper/StepOne.vue'
// import StepTwo from '../components/stepper/StepTwo.vue'
// import StepThree from '../components/stepper/StepThree.vue'
// import utils from '../firebase/utils/index.js'
// import _ from 'lodash'
// import VideoPlayer from '../components/VideoPlayer.vue'
// import utils from '../firebase/utils/index.js'
import { getBlob as getStorageBlob, ref } from 'firebase/storage'
export default {
    components: {
        // VideoPlayer
        // StepperComponent
    },
    // inject: ['Viewer'],
    data(){
        return {
            shit: null,
            imgViewer: null,
            // paymentType: null,
            // image: require('../assets/logo.png'),
            // showModal: false,
            // steps: [
            //     {
            //         name: "Step 1",
            //         desc: "Select Payment Method",
            //         icon: "fas fa-car",
            //         disabled: false,
            //         active: false,
            //         component: StepOne,
            //     },
            //     {
            //         name: "Step 2",
            //         desc: "Enter Payment Info",
            //         disabled: false,
            //         active: false,
            //         component: StepTwo,
            //     },
            //     {
            //         name: "Step 3",
            //         desc: "Do Something",
            //         icon: "fas fa-check",
            //         disabled: true,
            //         active: false,
            //         component: StepThree,
            //     },
            //     {
            //         name: "Confirmar",
            //         desc: "Review Payment Info",
            //         icon: "fas fa-check",
            //         disabled: false,
            //         active: false,
            //         component: StepThree,
            //         confirm: "Confirm"
            //     }
            // ]
            // test: 'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
            // img: '',
            // id: '',
            // vidPlaying: false,
            // vidLoaded: false,
            // sources: [],
            // consoleOpen: false,
            // videos: [
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_2.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_3.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_4-5.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_6.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_7.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_8.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_9.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_10.mp4',
            //     'gs://comics-77200.appspot.com/videos/chapter_1/PAGE_11.mp4',
            // ],
            // vidLoaded: [],
            // vidPlaying: [],
        }
    },
    created(){
        this.shitshit('gs://comics-77200.appspot.com/videos/chapter_1/PAGE_1.mp4').then((dataurl) => {
            this.shit = dataurl
        })
        // this.vidLoaded = this.videos.map(() => false)
        // this.vidPlaying = this.videos.map(() => false)
        // this.sources = this.videos.map(() => null)
    },
    methods: {
        async getBlob(gsPath){//gs://comics-77200.appspot.com/videos/test/PAGE_18.mp4
            return await getStorageBlob(ref(fb.storage, gsPath))
        },
        async shitshit(gsPath){
            const blob = await this.getBlob(gsPath)
            // return URL.createObjectURL(blob)
            // var img = document.createElement('img');
            // let url = URL.createObjectURL(blob)
            // img.src = url
            // document.getElementById('app').appendChild(img);
            // img.onload = () => {
            //     URL.revokeObjectURL(url)
            // }
            
            return await new Promise((resolve, reject) => {
                var a = new FileReader();
                a.onload = function(e) {
                    resolve(e.target.result);
                }
                a.onerror = function(e){
                    reject(e);
                }
                a.readAsDataURL(blob);
            })
        },
        paymentChange(){
            this.logger(this.paymentType)
        },
        asdf(){
            this.logger('asdfzxcv')
            // utils.revokeDataUrl(this.img, this.id)
        },
        toggleVideo(){
            // if(this.vidPlaying){
            //     this.$refs.videoElement.pause()
            //     this.vidPlaying = false
            // }else{
            //     this.$refs.videoElement.play()
            //     this.vidPlaying = true
            // }
        },
        hello(){
            this.logger('asdfasdfasdf')
        },
        // toggleVideo(idx){
        //     const strIndex = 'testVideo' + idx
        //     if(this.vidPlaying[idx]){
        //         this.$refs[strIndex][0].pause()
        //         this.vidPlaying[idx] = false
        //     }else{
        //         this.$refs[strIndex][0].play()
        //         this.vidPlaying[idx] = true
        //     }
        // },
        test(){
            window.postMessage('hello')
        },
    },
    mounted(){
        // //eslint-disable-next-line no-unused-vars

        // connectFunctionsEmulator(fb.functions, "localhost", 5001);
        // const createGopayCharge = httpsCallable(fb.functions, 'createGopayCharge-createGopayCharge');
        // createGopayCharge({
        //     transactionDetails: {
        //         grossAmount: 12300,
        //         orderId: 'test-1234'
        //     },
        //     customerDetails: {
        //         email: 'ppramesi@visi8.com',
        //         fullName: 'Priya Hayu Pramesi'
        //     }
        // }).then(this.logger)
        // utils.getProtectedDataUrlFromStorage(this.test).then(({media, identifier}) => {
        //     this.img = media
        //     this.id = identifier
        //     this.vidLoaded = true
        //     // utils.revokeDataUrl(media, identifier)
        // })
        // const loaders = []
        // Object.keys(this.$refs).forEach((el) => {
        //     loaders.push(this.$refs[el][0].getLoader())
        // })

        // // const playOnce = []
        // const videosDupe = [...this.videos]
        // videosDupe.pop()
        // //eslint-disable-next-line no-unused-vars
        // videosDupe.forEach((video, idx) => {
        //     const containerIndex = 'videoPlayer' + (idx + 1)
        //     this.logger(containerIndex)
        //     const play = _.once(this.$refs[containerIndex][0].playVideo)
        //     loaders[idx].elem.addEventListener('ended', () => {
        //         loaders[idx + 1].loader()
        //         loaders[idx + 1].scroller()
        //         play()
        //     })
        // })

        // loaders[0].loader()
        // loaders[0].scroller()

        // document.addEventListener('scroll', () => {
        //     _.debounce(() => {
        //         for(let i = 1; i < this.videos.length; i++){
        //             const containerIndex = 'videoPlayer' + i
        //             if(!_.isEmpty(this.$refs[containerIndex][0])){
        //                 const myRect = this.$refs[containerIndex][0].$el.getBoundingClientRect()
        //                 if(myRect.top - window.innerHeight < 1){
        //                     loaders[i].loader()
        //                 }
        //             }
        //         }
        //     }, 100)()
        // })

        // const loaders = this.videos.map((video, idx) => {
        //     const loader = _.once(() => {
        //         utils.getDataUrlFromStorage(video).then((dataUrl) => {
        //             this.vidLoaded[idx] = true
        //             this.sources[idx] = dataUrl
        //             this.logger(idx + ' loaded')
        //         })
        //     })
        //     const scroller = _.once(() => {
        //         const containerIndex = 'testVideo' + idx + 'Container'
        //         this.$refs[containerIndex][0].scrollIntoView({
        //             behavior: 'smooth'
        //         });
        //     })

        //     return { loader, scroller }
        // })
        //eslint-disable-next-line no-unused-vars
        // this.videos.forEach((video, idx) => {
        //     const videoIndex = 'testVideo' + idx

        //     this.$refs[videoIndex][0].addEventListener('ended', () => {
        //         loaders[idx + 1].loader()
        //         loaders[idx + 1].scroller()
        //     })
        // })

        // utils.getDataUrlFromStorage(this.videos[0]).then((vid) => {
        //     this.vidLoaded[0] = true
        //     this.sources[0] = vid
        //     this.$refs.testVideo0Container.scrollIntoView({
        //         behavior: 'smooth'
        //     });
        // })
        // this.$refs.testVideo0.addEventListener('ended', () => {
        //     utils.getDataUrlFromStorage(this.videos[1]).then((vid) => {
        //         this.vidLoaded[1] = true
        //         this.sources[1] = vid
        //         this.$refs.testVideo1Container.scrollIntoView({
        //             behavior: 'smooth'
        //         });
        //         this.toggleVideo(1)
        //     })
        // })

        // loaders[0].loader()
        // loaders[0].scroller()

        // document.addEventListener('scroll', () => {
        //     _.debounce(() => {
        //         for(let i = 1; i < this.videos.length; i++){
        //             const containerIndex = 'videoPlayer' + i
        //             const myRect = this.$refs[containerIndex][0].getBoundingClientRect()
        //             if(myRect.top - window.innerHeight < 1){
        //                 loaders[i].loader()
        //             }
        //         }
        //     }, 100)()
        // })
    },
}
</script>

<style scoped>
.play-btn {
    width: 25%;
    height: auto;
    margin: 0 auto;
    margin-top: 10%;
}

.play-btn__svg{
    transition: 1s; 
    fill:#303030; 
}

</style>