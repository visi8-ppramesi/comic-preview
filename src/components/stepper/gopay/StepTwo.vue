<template>
    <KeepAlive>
        <gopay 
            :store="store" 
            ref="paymentComponent"
            @loading="loadingAction"
        ></gopay>
    </KeepAlive>
</template>

<script>
import Gopay from '../../payments/gopay/GopayCharger.vue'

export default {
    name: 'step-two',
    props: ['store'],
    components: {
        Gopay
    },
    emits: ['renameNextButton', 'loading', 'enableNext'],
    data(){
        return {
        }
    },
    mounted(){
        // switch(this.store.state.selectedPayment){
        //     case 'creditCard':
        //         this.$emit('renameNextButton', 'Charge')
        //         break;
        //     case 'gopay':
        //         this.$emit('renameNextButton', 'Check Status')
        //         break;
        //     case 'qrCode':
        //         this.$emit('renameNextButton', 'Confirm')
        //         break;
        // }
        this.$emit('enableNext')
        this.$emit('renameNextButton', 'Next')
        this.$emit('loading', true)
    },
    methods: {
        loadingAction(status){
            this.$emit('loading', status)
        }
        // nextStep(){
        //     const paymentData = this.$refs.paymentComponent.getPaymentInfo()
        //     this.store.setState('paymentData', paymentData)
        //     return true
        // }
    }
}
</script>

<style scoped>

</style>