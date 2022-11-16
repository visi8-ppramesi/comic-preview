<template>
  <div class="text-gray-50 bg-gray-800 mt-0 h-auto w-full z-20 top-0 font-open-sans box-border">
    <metainfo>
      <template v-slot:title="{content}">{{ content ? `${content} | Visi8 Webcomic` : `Visi8 Webcomic` }}</template>
    </metainfo>
    <nav class="bg-gray-800" v-show="showTopNav">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center md:hidden">
          </div>
          <div
            class="flex-1 flex items-center justify-center md:items-stretch md:justify-start"
          >
            <div
              @click="visit(routeResolver('Dashboard'))"
              class="flex-shrink-0 flex items-center"
            >
              <img
                class="block md:hidden h-16 w-auto p-3"
                style="box-sizing: border-box!important;"
                :src="visi8Icon"
                alt="Workflow"
              />
              <img
                class="hidden md:block h-16 w-auto p-3"
                :src="visi8Icon"
                alt="Workflow"
              />
            </div>
            <div class="hidden md:flex items-center md:ml-6">
              <div class="flex space-x-4">
                <div class="px-2 py-2 space-y-1">
                  <router-link :to="routeResolver('Dashboard')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">{{ $t('dashboard') }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex flex-col md:flex-row">
      <div
        class="md:w-96 max-w-screen min-h-screen-navbar md:min-h-full main-content flex-1 bg-gradient-to-t from-purple-800 to-indigo-900 h-auto text-black"
      >
        <router-view v-slot="{ Component }" :key="$route.fullPath">
          <transition :name="shouldTransition">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <div v-show="showNav" class="w-100 bg-gray-800 text-center h-full">
      <div class="max-w-5xl mx-auto md:px-5 divide-y md:justify-between flex md:flex-row flex-col md:divide-y-0 h-full w-full text-center">
        <!-- <div class="h-12 md:w-32 py-2 md:my-6 flex justify-center content-center items-center">
          <router-link class="footer-link" :to="routeResolver('AboutUs')">{{ $t('aboutUs').toUpperCase() }}</router-link>
        </div> -->
        <div v-if="isLoggedIn" class="h-12 md:w-32 py-2 md:my-6 flex justify-center content-center items-center">
          <router-link class="footer-link" :to="routeResolver('MyAccount')">{{ $t('myAccount').toUpperCase() }}</router-link>
        </div>
        <div class="h-12 md:w-32 py-2 md:my-6 flex justify-center content-center items-center">
          <router-link class="footer-link" :to="routeResolver('PrivacyPolicy')">{{ $t('privacyPolicy').toUpperCase() }}</router-link>
        </div>
        <div class="h-12 md:w-32 py-2 md:my-6 flex justify-center content-center items-center">
          <router-link class="footer-link" :to="routeResolver('ContactUs')">{{ $t('contactUs').toUpperCase() }}</router-link>
        </div>
        <!-- <div class="h-12 md:w-32 py-2 flex justify-center content-center items-center">
          <router-link :to="routeResolver('FAQ')">{{ $t('faq').toUpperCase() }}</router-link>
        </div> -->
        <div v-if="multiLanguage" class="h-12 md:w-32 py-2 md:my-6 flex justify-center content-center items-center text-sm">
          <span class="mr-2">{{ $t('language').toUpperCase() }}:</span>
          <span @click="selectLanguage('en')" class="lang-selector" :class="{ 'lang-selected': $i18n.locale === 'en' }">En</span> | <span @click="selectLanguage('id')" class="lang-selector" :class="{ 'lang-selected': $i18n.locale === 'id' }">Id</span>
        </div>
      </div>
      <div class="pb-3">
        <div class="h-12 py-2 flex justify-center content-center items-center">
          {{ $t('follow') }}
        </div>
        <div class="flex items-center justify-center">
          <a v-if="socials?.facebook" target="_blank" :href="socials.facebook"><img class="w-12 h-12" :src="facebook" /></a>
          <a v-if="socials?.instagram" target="_blank" :href="socials.instagram"><img class="w-12 h-12" :src="instagram" /></a>
          <a v-if="socials?.twitter" target="_blank" :href="socials.twitter"><img class="w-12 h-12" :src="twitter" /></a>
        </div>
      </div>
    </div>
  </div>
  <div id="modal"></div>
</template>

<script>
import { useAuthStore } from './store/auth.js'
import { mapState } from 'pinia'
import { useI18nStore } from '@/store/i18n.js'
import Settings from './firebase/Setting.js'
import isNil from 'lodash/isNil'
// import facebook from "../assets/icons/facebook.png";
// import instagram from "../assets/icons/instagram.png";
// import twitter from "../assets/icons/twitter.png";
const i18Texts = {
  messages: {
    en: {
      language: 'Language',
      myAccount: 'My Account',
      faq: 'FAQ',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      dashboard: 'Home',
      myComics: 'My Comics',
      myTransactions: 'My Transactions',
      purchaseTokens: 'Purchase Tokens',
      aboutUs: 'About Us',
      privacyPolicy: 'Privacy Policy',
      follow: 'Follow Us On',
      contactUs: 'Contact Us',
      myNotifications: 'My Notifications'
    },
    id: {
      language: 'Bahasa',
      myAccount: 'Akun Saya',
      faq: 'FAQ',
      logout: 'Keluar',
      login: 'Masuk',
      register: 'Daftar',
      dashboard: 'Home',
      myComics: 'Komik Saya',
      myTransactions: 'Transaksi Saya',
      purchaseTokens: 'Beli Token',
      aboutUs: 'Tentang Kami',
      privacyPolicy: 'Kebijakan Privasi',
      follow: 'Ikuti Kami Di',
      contactUs: 'Hubungi Kami',
      myNotifications: 'Notifikasi Saya'
    }
  }
}

export default {
  name: "App",
  components: {

  },
  i18n: i18Texts,
  mounted(){
    document.addEventListener('click', (e) => {
      if(!(e.target.closest("#mobile-menu-button") || e.target.closest("#user-menu-button"))){
        this.mobileMenuOpen = false
        this.profileMenuOpen = false
      }
    })
    this.emitter.on('navigate', () => {
      this.mobileMenuOpen = false
      this.profileMenuOpen = false
    })
    this.getSocials()
  },
  setup(){
    const i18nStore = useI18nStore()
    const authStore = useAuthStore()
    authStore.authAction()
    return {
      authStore,
      i18nStore
    }
  },
  // created(){
  //   useAuthStore().authAction()
  // },
  data() {
      return {
          cartCount: 0,
          mobileMenuOpen: false,
          profileMenuOpen: false,
          visi8Icon: require('./assets/visi8_logo_new.png'),
          facebook: require('./assets/icons/facebook.png'),
          instagram: require('./assets/icons/instagram.png'),
          twitter: require('./assets/icons/twitter.png'),//require('./assets/visi8_logo.png'),
          socials: {},
      }
  },
  inject: [
    'routeResolver',
    'emitter',
    'detectMobile'
  ],
  computed: {
    shouldTransition(){
      return this.detectMobile() && 'slidee'
    },
    multiLanguage: () => process.env.VUE_APP_MULTI_LANGUAGE === 'true',
    showNav(){
      return this.$route.meta.showNav
    },
    showTopNav(){
      return isNil(this.$route.meta.showTopNav) ? true : this.$route.meta.showTopNav
    },
    ...mapState(useAuthStore, ['user', 'isLoggedIn', 'profile_image_url', 'unreadCount'])
  },
  methods: {
    selectLanguage(lang){
      this.i18nStore.changeLocale(lang)
    },
    goTo(url){
      this.$router.push(url)
    },
    async getSocials(){
      this.socials = (await Settings.getSocials()).value
    },
    goToSearch(){
      this.$router.push(this.routeResolver('Search'))
    },
    test(){
      this.$toast.open({
        message: "Test message from Vue",
        type: "success",
        duration: 5000,
        dismissible: true
      })
      // this.$toast.open('dfaskljadskljdhasfkljdhasfkljahsdfkljhasdfkljh')
    },
    visit(route){
      this.$router.push(route)
    },
    post(route){
      this.logger(route)
    }
  }
};
</script>

<style scoped>
.footer-link{
  text-decoration: underline;
}
</style>

<style>
.lang-selected:before{
  display: inline-block;
  width: 15px;
  height: 15px;
  content: url("data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22white%22%20stroke-width=%222%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20d=%22M5%2013l4%204L19%207%22%20/%3E%3C/svg%3E");
}
.lang-selected{
  padding: 1px 5px;
  display: flex;
  align-items: center;
  border: 1px white solid;
  border-radius: 8px;
  align-items: center;
}
#mobile-menu {
  z-index: 900;
}
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.badge {
  position: relative;
  top: -13px;
  right: -34px;
  padding: 0px 5px;
  border-radius: 50%;
  background: red;
  font-size: 12px;
  color: white;
  pointer-events: none;
}

/* .slidee-enter-active,
.slidee-leave-active {
  transition: all 0.75s ease-out;
}
.slidee-enter-to {
  position: absolute;
  transform: translate(0, 0);
}
.slidee-enter-from {
  position: absolute;
  transform: translate(100%, 0);
}
.slidee-leave-to {
  position: absolute;
  transform: translate(-100%, 0);
}
.slidee-leave-from {
  position: absolute;
  transform: translate(0, 0);
} */



.slidee-enter-active {
  transition: opacity 0.5s ease;
}
.slidee-leave-active {
  transition: opacity 0.05s ease;
}

.slidee-enter-from,
.slidee-leave-to {
  opacity: 0;
}
</style>
