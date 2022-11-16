<template>
    <KeepAlive>
        <credit-card 
            :store="store" 
            ref="creditCardInput"
            @loading="loadingAction"
        ></credit-card>
    </KeepAlive>
    <vue-final-modal 
        v-model="showCardAuthentication"
        id="huhuh"
        classes="flex justify-center items-center z-50"
        content-class="max-w-2xl max-h-screen-4-y overflow-y-auto relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
        <iframe frameborder="0" style="height:100vh; width:100%;" :src="cardAuthUrl">
        </iframe>
    </vue-final-modal>
</template>

<script>
import CreditCard from '../../payments/creditCard/CreditCardInput.vue'
import CreditCardCharger from '../../../midtrans/CreditCard.js'
import { useAuthStore } from '@/store/auth'
import { mapState } from 'pinia'

export default {
    name: 'step-two',
    props: ['store'],
    components: {
        CreditCard
    },
    emits: ['renameNextButton', 'loading', 'enableNext', 'error', 'nextStep'],
    inject: ['routeResolver'],
    data(){
        return {
            showCardAuthentication: false
        }
    },
    computed: {
        ...mapState(useAuthStore, ['uid', 'user'])
    },
    mounted(){
        this.$emit('loading', false)
        this.$emit('renameNextButton', 'Purchase')
        this.$emit('enableNext')
    },
    methods: {
        // onMessageCallback(data){
        //     if (data && "200" == data.status_code) {
        //         this.showCardAuthentication = false
        //         this.$emit('nextStep', true)
        //     } else {
        //         if (data && "201" == data.status_code) {
        //             this.showCardAuthentication = false
        //             this.$emit('nextStep', true)
        //         } else {
        //             this.showCardAuthentication = false
        //             //show error here
        //         }
        //     }
        // },
        async createCharge(){
            const onMessageCallback = function({ data }){
                this.logger(['message callback', data])
                if (data && "200" == data.status_code) {
                    this.showCardAuthentication = false
                    this.$emit('nextStep', true)
                } else {
                    if (data && "201" == data.status_code) {
                        this.showCardAuthentication = false
                        this.$emit('nextStep', true)
                    } else {
                        this.showCardAuthentication = false
                        //show error here
                    }
                }

                if (window.addEventListener) {
                    window.removeEventListener("message", onMessageCallback, false)
                }
            }.bind(this)
            this.$emit('loading', true)
            const ccData = this.$refs.creditCardInput.getPaymentInfo()
            const ccCharger = new CreditCardCharger(process.env.VUE_APP_MIDTRANS_CLIENT_KEY, process.env.VUE_APP_MIDTRANS_ENV)
            let data
            try{
                if(this.store.state.chapterData === 'all'){
                    ({ data } = await ccCharger.createComicCharge({
                        comicData: this.store.state.comicData,
                        user: this.user
                    }, ccData))
                }else{
                    ({ data } = await ccCharger.createChapterCharge({
                        chapterData: this.store.state.chapterData,
                        comicData: this.store.state.comicData,
                        user: this.user
                    }, ccData))
                }

                this.store.setState('responseData', data)
                this.$emit('loading', false)
                if(data.chargeResponse.status_code == '201'){
                    if (window.addEventListener) {
                        window.addEventListener("message", onMessageCallback, false);
                    } else {
                        window.attachEvent("onmessage", onMessageCallback);
                    }
                    this.cardAuthUrl = data.chargeResponse.redirect_url
                    this.showCardAuthentication = true
                    // const url = new URL(data.chargeResponse.redirect_url)
                    // url.searchParams.append('callback_type', 'form')
                    // url.searchParams.append('callback_url', window.location.origin + this.routeResolver('Comic', {id: this.store.state.comicData.id}, {}, 'string'))
                    // const win = window.open(url.toString(), "", "width=500,height=500")
                    return false
                }else if(data.chargeResponse.status_code == '200'){
                    return true
                }else{
                    this.$emit('loading', false)
                    this.$emit('error', { status: true, message: 'Credit card rejected' })
                    return false
                }
            }catch(err){
                this.$emit('loading', false)
                this.$emit('error', { status: true, message: 'Credit card rejected' })
                return false
            }
        },
        async nextStep(pass = null){
            if(pass){
                return true
            }
            return await this.createCharge()
        },
        loadingAction(status){
            this.$emit('loading', status)
        }
    }
}
</script>

<style scoped>

</style>