<template>
    <div class="text-sm font-normal leading-normal">{{ $t("gopay") }}</div>
    <div v-if="detectMobile()" class="text-md font-normal leading-normal">
       <ul class="text-xs px-6 list-decimal">
            <li>{{ $t("step1Mobile") }}</li>
            <li>{{ $t("step2Mobile") }}</li>
            <li>{{ $t("step3Mobile") }}</li>
            <li>{{ $t("step4Mobile") }}</li>
            <li>{{ $t("step5Mobile") }}</li>
            <li>{{ $t("step6Mobile") }}</li>
            <li>{{ $t("step7Mobile") }}</li>
       </ul>
    </div>
    <div v-else>
       <ul class="text-xs px-6 list-decimal">
            <li>{{ $t("step1Desktop") }}</li>
            <li>{{ $t("step2Desktop") }}</li>
            <li>{{ $t("step3Desktop") }}</li>
            <li>{{ $t("step4Desktop") }}</li>
       </ul>
    </div>
    <div class="flex items-center justify-center">
        <img id="qr-code-img" :src="midtransQrCode" class="max-h-screen">
    </div>
    <div class="flex w-full items-center justify-center">
        <button @click="downloadQrCode" class="disabled:bg-purple-300 disabled:text-gray-500 text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("download") }}</button>
    </div>
</template>

<script>
import GopayCharger from '../../../midtrans/Gopay.js'
// import Comic from '../../firebase/comics/Comic.js'
import { useAuthStore } from '../../../store/auth.js'
import { mapState } from 'pinia'

const i18Texts = {
  messages: {
    en: {
      gopay: 'Payment via Gopay :',
      step1Mobile: 'Click the Download QR Code button to save the QR code',
      step2Mobile: 'Open Go-jek application to continue your payment',
      step3Mobile: 'Enter the Qr code that you have saved before',
      step4Mobile: 'Double check the details of your payment',
      step5Mobile: 'If the details already correct, click confirm and continue to your payment',
      step6Mobile: 'Transaction successful',
      step7Mobile: 'Open the webcomic and check again the transactions you have made',
      step1Desktop: 'Open the gojek application and click pay',
      step2Desktop: 'scan Qr code to continue payment',
      step3Desktop: 'Double check the amount of payment',
      step4Desktop: 'Please enter your pin number and confirm payment',
      scan: 'Please scan the QR code with GoPay App:',
      download: 'Download QR Code'
    },
    id: {
      gopay: 'Pembayaran via Gopay :',
      step1Mobile: 'Klik tombol Unduh Qr Code untuk menyimpan QR codenya',
      step2Mobile: 'Buka aplikasi Go-jek untuk melanjutkan pembayaran',
      step3Mobile: 'Masukkan Qr code yang telah diunduh sebelumnya',
      step4Mobile: 'Periksa kembali detail dari pembayaran kamu',
      step5Mobile: 'Jika sudah sesuai, lakukan konfirmasi dan pembayaran',
      step6Mobile: 'Transaksi berhasil',
      step7Mobile: 'Buka website komik dan cek kembali transaksi yang telah kamu lakukan',
      step1Desktop: 'Buka aplikasi gojek dan klik bayar',
      step2Desktop: 'Scan Qr code untuk melanjutkan pembayaran',
      step3Desktop: 'Pastikan jumlah bayaran yang tertera',
      step4Desktop: 'Silahkan masukkan nomor pin dan melakukan pembayaran',
      scan: 'Harap scan qr code dengan aplikasi gopay:',
      download: 'Unduh Qr Code'
    }
  }
}

export default {
    data(){
        return {
            something: '',
            midtransQrCode: null
        }
    },
    i18n: i18Texts,
    emits: ['loading'],
    props: ['store'],
    inject: ['detectMobile'],
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    mounted(){
        const gopayCharger = new GopayCharger(process.env.VUE_APP_MIDTRANS_CLIENT_KEY, process.env.VUE_APP_MIDTRANS_ENV);
        const conditionalCharge = () => {
            if(this.store.state.chapterData === 'all'){
                return gopayCharger.createComicCharge({
                    comicData: this.store.state.comicData,
                    user: this.user
                })
            }else{
                return gopayCharger.createChapterCharge({
                    chapterData: this.store.state.chapterData,
                    comicData: this.store.state.comicData,
                    user: this.user
                })
            }
        }
        conditionalCharge().then(({data}) => {
            this.midtransQrCode = data.chargeResponse.actions.find(v => v.name == 'generate-qr-code').url
            this.store.setState('responseData', data)
            this.$emit('loading', false)
        }).catch((err) => {
            this.$emit('loading', false)
            console.error(err)
            this.$toast.open({
                message: "Create charge error",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
        })

        // const createGopayCharge = httpsCallable(fb.functions, 'createChapterGopayCharge-createChapterGopayCharge');
        // /*
        //     chapterData
        //     comicData
        //     user
        // */
        // const cptDetails = this.store.state.chapterData//cmc.chapters_data.find(v => v.id == this.store.state.chapter)
        // const taxRate = 0.11 //change later into settings
        // const tax = Math.round(this.store.state.price * taxRate)
        // const fee = 0 //change later into settings
        // const total = Math.round(this.store.state.price + tax + fee)
        // const param = {
        //     transactionDetails: {
        //         grossAmount: total,
        //         tax, fee
        //     },
        //     itemsDetails: [{
        //         chapterId: this.store.state.chapter,
        //         comicId: this.store.state.comic,
        //         chapterNum: cptDetails.chapter_number, 
        //         comicName: this.store.state.comicData.title,
        //         itemPrice: this.store.state.price
        //     }],
        //     customerDetails: {
        //         userId: this.uid,
        //         email: this.user.email,
        //         fullName: this.user.full_name
        //     }
        // }
        // createGopayCharge(param).then(({data}) => {
        //     this.midtransQrCode = data.chargeResponse.actions.find(v => v.name == 'generate-qr-code').url
        //     this.$emit('loading', false)
        // }).catch((err) => {
        //     this.$emit('loading', false)
        //     console.error(err)
        //     this.$toast.open({
        //         message: "Create charge error",
        //         type: "error",
        //         duration: 5000,
        //         dismissible: true,
        //         position: 'bottom'
        //     })
        // })
    },
    methods: {
        downloadQrCode(){
            window.open(this.midtransQrCode, '_blank')
        },
        getPaymentInfo(){
            return {
                something: this.something
            }
        }
    }
}
</script>

<style scoped>

</style>