<template>
    <div class="mb-4 text-2xl font-normal leading-normal">{{ $t("payment")}}</div>
    <div class="mb-4 w-full h-10 flex justify-center items-center">
        <div class="text-xl"> {{status}}</div>
    </div>
    <div class="flex w-full justify-center items-center">
        <button @click="checkStatus" id="check-status-button" class="disabled:bg-purple-300 disabled:text-gray-500 text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("check")}}</button>
    </div>
</template>

<script>
import Order from '@/firebase/users/Order.js'
import { useAuthStore } from '@/store/auth.js'
import { mapState } from 'pinia'

const i18Texts = {
  messages: {
    en: {
      payment: 'Payment Status',
      check: 'Check Status'
    },
    id: {
      payment: 'Status Pembayaran',
      check: 'Cek Status'
    }
  }
}

export default{
    name: 'gopay-checker',
    props: ['store'],
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    emits: ['setNextButtonStatus', 'loading', 'setNextButtonStatus'],
    i18n: i18Texts,
    data(){
        return {
            status: 'Waiting payment'
        }
    },
    mounted(){
        this.$emit('setNextButtonStatus', false)
        this.$emit('loading', true)
        this.checkStatus()
    },
    methods: {
        async checkStatus(){
            const order = await Order.getDocument(['users', this.user.id, 'orders'], this.store.state.responseData.chargeResponse.order_id)
            this.$emit('loading', false)
            if(!order.empty){
                switch(order.status){
                    case 'closed':
                        this.emitter.emit('chapterPurchased', [this.store.state.chapterData.id])
                        this.$emit('setNextButtonStatus', true)
                        this.status = 'Payment successful'
                        break;
                    case 'open':
                        this.status = 'Waiting payment'
                        break;
                    default:
                        this.status = 'Payment failed'
                        break;
                }
            }
        }
    }
}
</script>

<style>

</style>