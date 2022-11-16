<template>
    <div class="flex text-center text-white text-5xl h-screen-navbar w-screen justify-center items-center">
        <div id="arscene-loading">
            {{ $t("loading") }}
        </div>
    </div>
</template>

<script>
import Scene from '../firebase/comics/Scene.js'
import registerBetterHoldDrag from '@/utils/ar/betterHoldDrag'

const i18Texts = {
  messages: {
    en: {
        loading: 'Loading... Please wait'
    },

    in: {
        loading: 'Loading... Harap Tunggu'
    }
  }
}

export default {
    name: 'scene-show',
    i18n: i18Texts,
    data(){
        return {
            origHtmlClass: '',
            scene: null,
            loadingComponent: null
        }
    },
    watch: {
        '$route'(){
            this.destroyXr()
            if(this.loadingComponent && document.getElementsByClassName('vld-container').length > 0){
                this.loadingComponent.hide()
            }
        }
    },
    methods:{
        mountScene(){
            document.body.insertAdjacentHTML('beforeend', this.scene)
            if(this.loadingComponent && document.getElementsByClassName('vld-container').length > 0){
                this.loadingComponent.hide()
            }
        },
        onXrLoaded(){
        },
        destroyXr(){
            const ascene = document.getElementsByTagName('a-scene')[0]
            ascene.parentNode.removeChild(ascene)
            const eightWallLoading = document.getElementById('loadingContainer')
            if(eightWallLoading !== null){
                eightWallLoading.parentNode.removeChild(eightWallLoading)
            }
            const html = document.getElementsByTagName('html')[0]
            html.className = this.origHtmlClass
            window.removeEventListener('xrloaded', this.mountScene)
        }
    },
    created(){
        this.loadingComponent = this.$loading.show({
            loader: 'dots'
        });
        let scriptPromise
        let runFunc
        if(!document.getElementById('8thwall-script') && this.detectMobile()){
            const injectScript = (id, url, afterLoad = () => {}) => {
                const script = document.createElement('script')
                script.setAttribute('src', url)
                script.setAttribute('id', id)
                document.head.appendChild(script)
                //eslint-disable-next-line no-unused-vars
                return new Promise((resolve, reject) => {
                    script.addEventListener('load', () => {
                        Promise.resolve(afterLoad)
                            .then(v => v())
                            .then((k) => {
                                resolve(k)
                            })
                        // if(afterLoad[Symbol.toStringTag] === 'AsyncFunction'){
                        //     afterLoad().then(resolve)
                        // }else{
                        //     afterLoad()
                        //     resolve(true)
                        // }
                    })
                })
            }
            scriptPromise = Promise.all([
                injectScript('8thwall-script', `https://apps.8thwall.com/xrweb?appKey=${process.env.VUE_APP_8THWALL_APP_KEY}`),
                injectScript('8frame-script', `https://cdn.8thwall.com/web/aframe/8frame-1.2.0.min.js`, () => {
                    return Promise.all([
                        injectScript('xrextras-script', `https://cdn.8thwall.com/web/xrextras/xrextras.js`, () => {
                            registerBetterHoldDrag(window.AFRAME)
                            return Promise.resolve(true)
                        }),
                        injectScript('aframe-extras-script', `https://cdn.8thwall.com/web/aframe/aframe-extras-6.1.1.min.js`),
                    ])
                }),
            ])
            //https://apps.8thwall.com/xrweb?appKey=${process.env.VUE_APP_8THWALL_APP_KEY}
            //https://cdn.8thwall.com/web/aframe/8frame-1.2.0.min.js
            //https://cdn.8thwall.com/web/xrextras/xrextras.js
            //https://cdn.8thwall.com/web/aframe/aframe-extras-6.1.1.min.js
            // const script = document.createElement('script')
            // script.setAttribute('src', `https://apps.8thwall.com/xrweb?appKey=${process.env.VUE_APP_8THWALL_APP_KEY}`)
            // script.setAttribute('id', '8thwall-script')
            // document.head.appendChild(script)
            // //eslint-disable-next-line no-unused-vars
            // scriptPromise = new Promise((resolve, reject) => {
            //     script.addEventListener('load', () => {
            //         resolve(true)
            //     })
            // })
            runFunc = () => {
                window.addEventListener('xrloaded', this.mountScene)
            }
        }else{
            scriptPromise = Promise.resolve(true)
            runFunc = this.mountScene
        }
        Scene.getDocumentWithStorageResourceUrl([
            'comics',
            this.$route.params.comicId,
            'chapters',
            this.$route.params.chapterId,
            'pages',
            this.$route.params.pageId,
            'scenes'
        ], this.$route.params.sceneId, ['ar_model_url']).then((scene) => {
            const regexMatch = scene.scene_html.match(/%%model_url%%/g)
            if(regexMatch && regexMatch.length > 0){
                this.scene = scene.scene_html.replace(/%%model_url%%/g, scene.ar_model_url)
            }else{
                this.scene = scene.scene_html
            }

            const html = document.getElementsByTagName('html')[0]
            this.origHtmlClass = html.className
            scriptPromise.then(() => {
                runFunc()
            })
            
        })

        // if(false){
        //     const html = document.getElementsByTagName('html')[0]
        //     this.origHtmlClass = html.className
        //     document.body.insertAdjacentHTML('beforeend', this.scene)
        //     window.addEventListener('xrloaded', this.onXrLoaded)
        // }

        // axios.get(route('api.page.show.scene', {page: this.$route.params.pageId}))
        // .then((response) => {
        //     const html = document.getElementsByTagName('html')[0]
        //     this.origHtmlClass = html.className
        //     document.body.insertAdjacentHTML('beforeend', response.data.scene)
        //     window.addEventListener('xrloaded', this.onXrLoaded)
        // })
    },
    // beforeUnmount(){
    //     this.destroyXr()
    // },
}
</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
