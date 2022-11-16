<template>
    <payment-checker
        :store="store" 
        ref="paymentComponent"
        @loading="loadingAction"
        @set-next-button-status="setNextButtonStatus"
    ></payment-checker>
    <div></div>
</template>

<script>
import PaymentChecker from '../../payments/PaymentChecker.vue'
export default{
    name: 'step-three',
    props: ['store'],
    inject: ['routeResolver'],
    components: {
        PaymentChecker
    },
    data(){
        return {
        }
    },
    emits: ['renameNextButton', 'loading', 'enableNext', 'disableNext'],
    mounted(){
        this.$emit('renameNextButton', 'Read Chapter')
        this.$emit('loading', true)
    },
    methods: {
        setNextButtonStatus(enabled){
            if(enabled){
                this.$emit('enableNext')
            }else{
                this.$emit('disableNext')
            }
        },
        nextStep(){
            if(this.store.state.chapterData === 'all'){
                this.$router.go()
            }else{
                this.$router.push(this.routeResolver('Chapter', {
                    comicId: this.store.state.comicData.id, 
                    chapterId: this.store.state.chapterData.id 
                }))
            }
        },
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

<style></style>