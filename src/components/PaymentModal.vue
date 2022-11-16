<template>
    <vue-final-modal 
        v-model="showModal"
        classes="flex justify-center items-center"
        content-class="max-w-2xl max-h-screen-4-y overflow-y-auto relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
        <div v-if="page == 0">
            <div class="d-stepper">
                <card
                    class="my-4 overflow-hidden"
                    bg-variant="light"
                    no-body
                    :class="{ 'border-danger': error, 'shake-error': shake }"
                >
                    <div>
                        <select-payment @change-payment="paymentChange">
                        </select-payment>
                    </div>
                </card>
                <div class="flex flex-row w-full justify-between">
                    <button 
                        id="close-button-top"
                        class="text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        @click="closeModal"
                    >{{ $t("close") }}</button>
                    <div class="footer flex justify-end" v-if="!fatalError">
                        <button
                            id="next-button-top"
                            variant="success"
                            class="disabled:bg-purple-300 disabled:text-gray-500 text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            @click="nextStep"
                            :disabled="loading || nextDisabled"
                        >
                            {{ $t("next") }}
                            <i class="fas fa-angle-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="page == 1">
            <stepper-component v-if="selectedPayment == 'gopay'" ref="stepperGopay" @back-step="backStep" @confirm="confirm" :steps="stepsGopay" :initial-state="{ comicData, chapterData }">
                <template #fatal-error="{ errorMsg }">{{ errorMsg }}</template>
                <template #action-buttons>
                    <button 
                        id="close-button-gopay"
                        class="text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        @click="closeModal"
                    >{{ $t("close") }}</button>
                </template>
            </stepper-component>
            <stepper-component v-else-if="selectedPayment == 'cc'" ref="stepperCreditCard" @back-step="backStep" @confirm="confirm" :steps="stepsCreditCard" :initial-state="{ comicData, chapterData }">
                <template #fatal-error="{ errorMsg }">{{ errorMsg }}</template>
                <template #action-buttons>
                    <button 
                        id="close-button-cc"
                        class="text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        @click="closeModal"
                    >{{ $t("close") }}</button>
                </template>
            </stepper-component>
            <!-- <stepper-component v-else-if="selectedPayment == 'qrCode'" ref="stepperQrCode" @back-step="backStep" @confirm="confirm" :steps="stepsQrCode" :initial-state="{ comicData, chapterData }">
                <template #fatal-error="{ errorMsg }">{{ errorMsg }}</template>
                <template #action-buttons>
                    <button 
                        class="text-xs lg:text-lg items-center min-h-8 p-2 rounded-lg text-gray-50 bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        @click="closeModal"
                    >Close</button>
                </template>
            </stepper-component> -->
        </div>
    </vue-final-modal>
</template>

<script>
import Card from "./Card.vue";
import SelectPayment from './stepper/SelectPayment.vue'
import StepperComponent from './stepper/StepperComponent.vue'
import GopayStepOne from './stepper/gopay/StepOne.vue'
import GopayStepTwo from './stepper/gopay/StepTwo.vue'
import GopayStepThree from './stepper/gopay/StepThree.vue'

import CcStepOne from './stepper/creditCard/StepOne.vue'
import CcStepTwo from './stepper/creditCard/StepTwo.vue'
import CcStepThree from './stepper/creditCard/StepThree.vue'

import { nextTick } from 'vue'

const i18Texts = {
  messages: {
    en: {
      next: 'Next',
      close: 'Close'
    },
    id: {
      next: 'Selanjutnya',
      close: 'Tutup'
    }
  }
}

export default {
    name: 'payment-modal',
    i18n: i18Texts,
    components: {
        StepperComponent,
        Card,
        SelectPayment
    },
    inject: ['routeResolver'],
    props: [
        'chapterData',
        'comicData'
    ],
    methods: {
        backStep(stepNum){
            if(stepNum == 0){
                this.page -= 1
            }
        },
        nextStep(){
            this.page += 1
            nextTick(() => {
                if(this.page == 1){
                    if(this.selectedPayment == 'gopay'){
                        Object.keys(this.tempState).forEach((key) => {
                            const value = this.tempState[key]
                            this.$refs.stepperGopay.setState(key, value)
                        })
                    }else if(this.selectedPayment == 'cc'){
                        Object.keys(this.tempState).forEach((key) => {
                            const value = this.tempState[key]
                            this.$refs.stepperCreditCard.setState(key, value)
                        })
                    }else if(this.selectedPayment == 'qrCode'){
                        Object.keys(this.tempState).forEach((key) => {
                            const value = this.tempState[key]
                            this.$refs.stepperQrCode.setState(key, value)
                        })
                    }
                }
            })
        },
        paymentChange(newPayment){
            this.selectedPayment = newPayment
        },
        confirm(){
            if(this.selectedChapterData === 'all'){
                this.$router.push(this.routeResolver('Comic', {comicId: this.comicData.id}))
            }else{
                this.$router.push(this.routeResolver('Chapter', {comicId: this.comicData.id, chapterId: this.chapterData.id}))
            }
        },
        setState(key, value){
            this.tempState = {
                ...this.tempState,
                [key]: value
            }
            // if(this.selectedPayment == 'gopay'){
            //     this.$refs.stepperGopay.setState(key, value)
            // }else if(this.selectedPayment == 'cc'){
            //     this.$refs.stepperCreditCard.setState(key, value)
            // }else if(this.selectedPayment == 'qrCode'){
            //     this.$refs.stepperQrCode.setState(key, value)
            // }
        },
        openModal(){
            this.showModal = true
        },
        closeModal(){
            if(this.page == 1){
                if(this.selectedPayment == 'gopay'){
                    this.$refs.stepperGopay.resetState()
                }else if(this.selectedPayment == 'cc'){
                    this.$refs.stepperCreditCard.resetState()
                }
            }
            this.page = 0
            this.selectedPayment = 'gopay'
            this.showModal = false
        }
    },
    data(){
        return {
            page: 0,
            selectedPayment: 'gopay',
            showModal: false,
            tempState: {},
            stepsGopay: [
                {
                    name: "Step 1",
                    disabled: false,
                    active: false,
                    component: GopayStepOne
                },
                {
                    name: "Step 2",
                    disabled: false,
                    active: false,
                    component: GopayStepTwo,
                },
                {
                    name: "Step 3",
                    disabled: false,
                    active: false,
                    component: GopayStepThree,
                },
            ],
            stepsCreditCard: [
                {
                    name: "Step 1",
                    disabled: false,
                    active: false,
                    component: CcStepOne
                },
                {
                    name: "Step 2",
                    disabled: false,
                    active: false,
                    component: CcStepTwo
                },
                {
                    name: "Step 3",
                    disabled: false,
                    active: false,
                    component: CcStepThree,
                }
            ],
            // stepsQrCode: [
            //     {
            //         name: "Step 1",
            //         disabled: false,
            //         active: false,
            //         component: GopayStepOne
            //     },
            //     {
            //         name: "Step 2",
            //         disabled: false,
            //         active: false,
            //         component: GopayStepTwo,
            //     }
            // ],
        }
    }
}
</script>

<style scoped>

</style>