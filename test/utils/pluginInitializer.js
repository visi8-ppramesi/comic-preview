import router from '../../src/router/index.js'
import helpers from '../../src/utils/helpers'
import DRM from '../../src/utils/DRM.js'
import emitter from '../../src/utils/emitter.js'
import routeResolver from '../../src/utils/routeResolver';
import detectMobile from '../../src/utils/detectMobile'
import fbAnalytics from '../../src/utils/analytics.js'
import geofencing from '../../src/utils/geofencing.js'
import { isDeviceShitty } from '../../src/utils/detectMobile';
import { logger, errorInterceptor } from '../../src/utils/logger.js'
import asyncComponentLoader from '../../src/utils/asyncComponentLoader.js'
import { Vue3Mq, MqResponsive } from "vue3-mq"
import Toaster from '../../src/utils/toaster.js'
import { createPinia } from 'pinia';
import VueLoading from 'vue-loading-overlay';
import { vfmPlugin } from 'vue-final-modal'
import { createI18n } from 'vue-i18n'
import VueI18n from '../../src/utils/i18n.js'
import { createMetaManager, plugin as vueMetaPlugin } from "vue-meta"

const canRunAr = true

const vuePropertySetter = (app, name, instance) => {
    app.provide(name, instance)
    app.config.globalProperties[name] = instance
}
// const emitter = mitt()
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
        vuePropertySetter(app, '$loading', {
            show: () => ({
                hide: () => {}
            }),
        })
        // app.provide('swal', Swal)
        // app.provide('emitter', emitter)
        // app.config.globalProperties.emitter = emitter
        // app.provide('DRM', DRM)
        // app.provide('helpers', helpers)
        // app.provide('routeResolver', routeResolver)
        // app.provide('qrCode', QRCode)
    }
}

export default {
    plugins: {
        vfmPlugin,
        injector,
        router,
        // VueLoading,
        VueI18n,
        Vue3Mq,
        pinia: createPinia(),
        vueMetaPlugin,
        createMetaManager: createMetaManager()
    },
    components: {
        MqResponsive
    }
}