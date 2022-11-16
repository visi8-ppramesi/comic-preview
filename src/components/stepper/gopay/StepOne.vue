<template>
    <show-total :chapterData="store.state.chapterData" :comicData="store.state.comicData"></show-total>
</template>

<script>
import ShowTotal from '../../payments/ShowTotal.vue'

export default {
    name: 'step-two',
    props: ['store'],
    components: {
        ShowTotal
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
        this.$emit('loading', false)
        this.$emit('enableNext')
        this.$emit('renameNextButton', 'Next')
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