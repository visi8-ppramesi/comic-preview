import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './index.css'
// import Swal from "sweetalert2";
import helpers from './utils/helpers'
import DRM from './utils/DRM.js'
import emitter from './utils/emitter.js'
import routeResolver from './utils/routeResolver';
import detectMobile from './utils/detectMobile'
import canRunAr from './utils/canRunAr'
import { isDeviceShitty } from './utils/detectMobile';
import fbAnalytics from './utils/analytics.js'
import asyncComponentLoader from './utils/asyncComponentLoader.js'
import geofencing from './utils/geofencing.js'
import { Vue3Mq, MqResponsive } from "vue3-mq"
// import VueToast from 'vue-toast-notification';
import Toaster from './utils/toaster.js'
import { createPinia } from 'pinia';
import VueLoading from 'vue-loading-overlay';
import { vfmPlugin } from 'vue-final-modal'
import VueI18n from './utils/i18n'
import { createMetaManager, plugin as vueMetaPlugin } from "vue-meta"
import parallax from './utils/parallax.js'
import axios from 'axios'
// import comicStore from './utils/idbStore.js'
import { logger, errorInterceptor } from './utils/logger.js'
import fb from './firebase/firebase.js'
import isNil from 'lodash/isNil'
// import { createI18n } from 'vue-i18n'
// import QRCode from 'qrcode'
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-toast-notification/dist/theme-sugar.css';
// import _ from 'lodash'
// import './registerServiceWorker'

// _.mixin({
//     pipeline: function(){
//         const args = (_.isArray(arguments[0])) ? arguments[0] : arguments;
//         return function(seed){
//             return _.reduce(
//                 args,
//                 function(l,r) { return r(l); },
//                 seed
//             )
//         }
//     }
// })

// const locale = localStorage.getItem('locale') || 'en';
// const VueI18n = createI18n({
//     locale,
//     fallbackLocale: 'id'
// })
// window.comicStore = comicStore
errorInterceptor(fb.analytics)
axios.get('/image-manifest.json').then((result) => {
    window.imageManifest = result.data
})

const vuePropertySetter = (app, name, instance) => {
    app.provide(name, instance)
    app.config.globalProperties[name] = instance
}
const app = createApp(App)
window.detectors = {
    detectMobile,
    canRunAr
}
// const emitter = mitt()

const formatters = {
    absoluteTime: function (time, locale = "id-ID") {
        if (isNil(time)) return null;
        if (typeof time === "number" || typeof time === "string") {
            time = new Date(time);
        }
        if (typeof time.toDate === "function") {
            time = time.toDate();
        }
        const intlFormatter = new Intl.DateTimeFormat(locale);
        return intlFormatter.format(time);
    }
}
const injector = {
    install(app){
        vuePropertySetter(app, 'emitter', emitter)
        vuePropertySetter(app, 'DRM', DRM)
        vuePropertySetter(app, 'helpers', helpers)
        vuePropertySetter(app, 'routeResolver', routeResolver)
        // vuePropertySetter(app, 'qrCode', QRCode)
        vuePropertySetter(app, 'detectMobile', detectMobile)
        vuePropertySetter(app, 'canRunAr', canRunAr)
        vuePropertySetter(app, 'isDeviceShitty', isDeviceShitty)
        vuePropertySetter(app, 'fbAnalytics', fbAnalytics)
        vuePropertySetter(app, 'asyncComponentLoader', asyncComponentLoader)
        vuePropertySetter(app, '$toast', Toaster)
        vuePropertySetter(app, 'logger', logger)
        vuePropertySetter(app, 'formatters', formatters)
        if(process.env.VUE_APP_DRM_ENABLED == 'true'){
            vuePropertySetter(app, 'DRM', DRM)
        }
        if(process.env.VUE_APP_GEOFENCE_ENABLED == 'true'){
            const geofencePromise = geofencing.then((geofence) => {
                vuePropertySetter(app, 'geofence', geofence)
            })
            vuePropertySetter(app, 'geofencePromise', geofencePromise)
        }else{
            vuePropertySetter(app, 'geofencePromise', Promise.resolve(true))
            vuePropertySetter(app, 'geofence', true)
        }
        // app.provide('swal', Swal)
        // app.provide('emitter', emitter)
        // app.config.globalProperties.emitter = emitter
        // app.provide('helpers', helpers)
        // app.provide('routeResolver', routeResolver)
        // app.provide('qrCode', QRCode)
    }
}

app.directive('loading', (el, binding) => {
    if (binding.value || typeof binding.value === "undefined") {
        el.classList.add("state-loading");
        el.setAttribute("disabled", "disabled");
    } else {
        el.classList.remove("state-loading");
        el.removeAttribute("disabled");
    }
})

app.directive('parallax', parallax)

app.use(vfmPlugin)
app.use(injector)
app.use(router)
app.use(vueMetaPlugin)
app.use(createMetaManager())
// app.use(VueToast)
app.use(Vue3Mq, {preset: 'tailwind'})
app.use(VueLoading);
app.use(VueI18n);
app.use(createPinia())
app.component('mq-responsive', MqResponsive)

app.mount('#app')

export default app