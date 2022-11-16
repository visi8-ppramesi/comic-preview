<template>
    <div class="bg-cover bg-no-repeat bg-center overflow-y-scroll" :style="'background-image: linear-gradient(rgba(23,167,105,0.3) 50%, rgb(49 46 129)), url(' + karaBackground +');'">
        <div class="h-screen">
            <div class="w-full md:w-96 md:mx-auto min-h-screen flex flex-col p-5 justify-end md:justify-center">
                <form autocomplete="off">
                    <div id="register-username" class="mb-4">
                        <input name="username" for="username" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="username" id="username" type="text" placeholder="Username">
                    </div>
                    <div id="register-email" class="mb-4">
                        <input name="email" for="email" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="email" id="email" type="text" placeholder="Email">
                    </div>
                    <div id="register-fullname" class="mb-4">
                        <input name="full_name" for="full_name" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" v-model="full_name" id="full_name" type="text" placeholder="Full Name">
                    </div>
                    <div id="register-password" class="pass-form">
                        <input name="password" for="password" class="shadow appearance-none border border-red rounded-full w-full py-2 px-3 text-grey-darker mb-3" v-model="password" id="password" type="password" placeholder="Password">
                    </div>
                </form>
                <div id="register-failed" v-if="registerFailed" class="text-red-400 mb-2">{{ $t("failed") }}</div>
                <div class="flex flex-col items-center justify-between">
                    <button id="register-button" @click="register" class="bg-green-400 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full" type="button">
                        {{ $t("register") }}
                    </button>
                    <router-link :to="routeResolver('Login')" id="register-goback" class="text-blue-200 mt-4">
                        {{ $t("goback") }}
                    </router-link>
                </div>
                <div class="flex flex-row items-center justify-center mt-3">
                    <img id="register-facebook" class="w-10" :src="facebookIcon" />
                    <img id="register-instagram" class="w-10" :src="instagramIcon" />
                    <img id="register-twitter" class="w-10" :src="twitterIcon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'
import { useMeta } from 'vue-meta'

const i18Texts = {
  messages: {
    en: {
        failed: 'Register failed! Email already exists!',
        register: 'Register',
        goback: 'Go Back'
    },
    id: {
        failed: 'Pendaftaran gagal! Email sudah ada!',
        register: 'Daftar',
        goback: 'Kembali'
    }
  }
}
export default {
    name: 'register',
    i18n: i18Texts,
    inject: [
        'routeResolver',
        'emitter'
    ],
    mounted(){
        this.emitter.on('registerError', () => {
            this.registerFailed = true
            this.email = ''
            this.password = ''
            this.username = ''
            this.full_name = ''
        })
    },
    data(){
        return {
            email: '',
            password: '',
            username: '',
            full_name: '',
            loginFailed: false,
            facebookIcon: require('../assets/icons/facebook.png'),
            instagramIcon: require('../assets/icons/instagram.png'),
            twitterIcon: require('../assets/icons/twitter.png'),
            karaBackground: require('../assets/kara_bg.jpg'),
            registerFailed: false
        }
    },
    setup(){
        const authStore = useAuthStore()
        useMeta(
            {
                title: 'Register Page',
                meta: [
                    { property: 'og:title', content: 'Register Page' },
                    { property: 'og:description', content: 'register for new user' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/register' },
                ]
            },
        )

        return {
            authStore
        }
    },
    methods:{
        register(){
            this.authStore.register(this.email, this.password, 
                { name: this.username, full_name: this.full_name }, 
                () => {
                    this.$router.push({ name: 'Login', query: { registered: 1 } })
                },
                () => {
                    this.loginFailed = true
                    this.email = ''
                    this.password = ''
                    this.name = ''
                    this.full_name = ''
                })
            // this.$store.dispatch('register', {
            //     email: this.email,
            //     password: this.password,
            //     name: this.username,
            //     full_name: this.full_name
            // })
            // .then(response => {
            //     this.$router.push({ name: 'dashboard' })
            // })
            // .catch(error => {
            //     this.loginFailed = true
            // })
        },
    }
}
</script>

<style scoped>

</style>