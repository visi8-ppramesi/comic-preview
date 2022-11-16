<template>
    <div>Credit Card</div>

    <div class="flex flex-col">
        <div class="flex flex-col w-full">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    {{ $t("name") }}
                </label>
                <input id="credit-card-name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" v-model="name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="cardNumber">
                    {{ $t("cardNum") }}
                </label>
                <input id="credit-card-number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Card Number" v-model="cardNumber">
            </div>
            <div class="flex flex-row items-end">
                <div class="mb-4 h-full basis-1/4 mr-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="expMonth">
                        {{ $t("expMonth") }}
                    </label>
                    <select id="credit-card-exp-month" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="expMonth">
                        <option v-for="i in 12" :value="i" :key="'date-' + i">{{ i }}</option>
                    </select>
                    <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expMonth" type="text" placeholder="Expiration Month" v-model="expMonth"> -->
                </div>
                <div class="mb-4 h-full basis-1/4 mr-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="expYear">
                        {{ $t("expYear") }}
                    </label>
                    <select id="credit-card-exp-year" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="expYear">
                        <option v-for="i in 11" :value="currentYear + i - 1" :key="'year-' + i">{{ currentYear + i - 1 }}</option>
                    </select>
                    <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expYear" type="text" placeholder="Expiration Year" v-model="expYear"> -->
                </div>
                <div class="mb-4 h-full basis-2/4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="ccv">
                        {{ $t("ccv") }}
                    </label>
                    <input id="credit-card-ccv" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="CCV" v-model="ccv">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const i18Texts = {
  messages: {
    en: {
      name: 'Name',
      cardNum: 'Card Number',
      expMonth: 'Expiration Month',
      expYear: 'Expiration Year',
      cvv: 'CCV'
    },
    id: {
    name: 'Nama',
      cardNum: 'Nomor Kartu',
      expMonth: 'Bulan Kadaluarsa',
      expYear: 'Tahun Kadaluarsa',
      cvv: 'CCV'
    }
  }
}

export default {
    name: 'credit-card-input',
    props: ['store'],
    i18n: i18Texts,
    data(){
        return {
            name: '',
            cardNumber: '',
            expMonth: 1,
            expYear: (new Date()).getFullYear(),
            currentYear: (new Date()).getFullYear(),
            ccv: '',
        }
    },
    mounted(){
        this.logger('credit card')
    },
    methods: {
        getPaymentInfo(){
            return {
                name: this.name,
                card_number: this.cardNumber,
                card_exp_month: this.expMonth,
                card_exp_year: this.expYear,
                card_cvv: this.ccv,
            }
        }
    }
}
</script>

<style scoped>

</style>