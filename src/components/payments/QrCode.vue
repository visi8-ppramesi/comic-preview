<template>
    <div>{{ $t("scanQr")}}</div>
    <div>
        <loading v-model:active="isLoading"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage"/>
        <img :src="qrImage">
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

const i18Texts = {
  messages: {
    en: {
      scanQr: 'Scan QR Code'
    },
    id: {
      scanQr: 'Scan QR Code'
    }
  }
}

export default {
    components: {
        Loading
    },
    i18n: i18Texts,
    data(){
        return {
            code: '',
            isLoading: true,
            fullPage: false,
            qrImage: null,
        }
    },
    mounted(){
        //eslint-disable-next-line no-unused-vars
        this.qrCode.toDataURL('I am a pony!', { margin: 2, width: 300, height: 300 }, function (err, url) {
            this.qrImage = url
            this.isLoading = false
        }.bind(this))
    },
    methods: {
        onCancel(){

        },
        getPaymentInfo(){
            return {
                code: this.code
            }
        }
    }
}
</script>

<style scoped>

</style>