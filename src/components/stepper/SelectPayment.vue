<template>
    <div class="max-h-52">
        <div id="select-payment-title">{{ $t("method")}}</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
                <label class="label-container flex gopay items-center" for="gopay">
                    <img :src="gopay" class="w-full">
                </label>
                <input id="gopay-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="payment" class="group mt-auto" value="gopay" />
            </div>
            <!-- <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
                <label class="label-container flex qrcode" for="qrcode">
                    <img :src="qrcodeImage" class="w-full">
                </label>
                <input id="qrcode-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="payment" class="group mt-auto" value="qrCode" />
            </div> -->
            <div class="p-4 mb-4 bg-slate-100/50 rounded-lg mx-auto flex flex-col justify-center justify-items-center content-center items-center">
                <label class="label-container flex qrcode items-center" for="qrcode">
                    <img :src="cc" class="w-full">
                </label>
                <input id="creditcard-selector" v-model="selectedPayment" @change="paymentChange" type="radio" name="payment" class="group mt-auto" value="cc" />
            </div>
        </div>
    </div>
</template>

<script>
const i18Texts = {
  messages: {
    en: {
      method: 'Please select your payment method:'
    },
    id: {
      method: 'Harap pilih metode pembayaran'
    }
  }
}

export default {
    name: 'step-one',
    props: ['store'],
    i18n: i18Texts,
    emits: ['changePayment'],
    data(){
        return {
            selectedPayment: 'gopay',
            gopay: require('../../assets/icons/gopay.svg'),
            qrcodeImage: require('../../assets/icons/qris.png'),
            cc: require('../../assets/icons/cc.png'),
        }
    },
    methods: {
        paymentChange(){
            this.$emit('changePayment', this.selectedPayment)
        },
        nextStep(){
            this.store.setState('selectedPayment', this.selectedPayment)
            return true
        }
    }
}
</script>

<style scoped>
.label-container{
    min-height: calc(100% - 20px);
}
</style>