<template>
    <vue-final-modal
        :click-to-close="false"
        v-model="showModal"
        classes="flex justify-center items-center"
        content-class="items-center w-screen sm:w-4/5 max-h-screen-4-y overflow-y-auto relative flex flex-col mx-4 p-4 border rounded bg-white"
    >
        <div class="text-2xl mb-2">{{ $t("title") }}</div>
        <div class="text-md mb-4">{{ $t("description") }}</div>

        <div v-if="error" class="error text-red-400 mb-4">{{ $t("warning") }}</div>

        <div class="flex flex-col w-full sm:w-1/3 mb-4">
            <div class="flex flex-col w-full">
                <div class="flex flex-row items-end">
                    <div class="mb-4 h-full basis-1/3 mr-2">
                        <label class="block text-gray-700 text-sm font-bold" for="expMonth">
                            {{ $t("day") }}
                        </label>
                        <select id="dob-month" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="dobDate">
                            <option v-for="i in 31" :value="i" :key="'date-' + i">{{ i }}</option>
                        </select>
                    </div>
                    <div class="mb-4 h-full basis-1/3 mr-2">
                        <label class="block text-gray-700 text-sm font-bold" for="dobMonth">
                            {{ $t("month") }}
                        </label>
                        <select id="dob-month" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="dobMonth">
                            <option v-for="i in 12" :value="i" :key="'date-' + i">{{ toMonthString(i) }}</option>
                        </select>
                    </div>
                    <div class="mb-4 h-full basis-1/3 mr-2">
                        <label class="block text-gray-700 text-sm font-bold" for="dobYear">
                            {{ $t("year") }}
                        </label>
                        <select id="dob-year" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="dobYear">
                            <option v-for="i in 65" :value="currentYear - (i + 9)" :key="'year-' + i">{{ currentYear - (i + 9) }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <button @click="submitAge" class="text-sm items-center min-h-8 p-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("submitButton") }}</button>
            <button @click="goBack" class="text-sm items-center min-h-8 p-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("backButton") }}</button>
        </div>
    </vue-final-modal>
</template>

<script>
import { useAuthStore } from '../store/auth.js'

const i18Texts = {
  messages: {
    en: {
      title: 'Please Enter Your Age',
      description: 'This comic contains mature themes. You have to be at least 17 years old to view this comic. Please enter your birth day below:',
      warning: 'Sorry, You are not old enough to read this comic!',
      day: 'Day',
      month: 'Month',
      year: 'year',
      submitButton: 'Submit',
      backButton: 'Back'
    },
    id: {
      title: 'Tolong Masukkan Umur Anda',
      description: 'Komik ini mengandung konten dewasa. Anda harus berumur minimal 17 tahun untuk melihat komik ini. Tolong masukkan tanggal lahir anda:',
      warning: 'Mohon maaf, kamu tidak cukup umur untuk membaca komik ini!',
      day: 'Hari',
      month: 'Bulan',
      year: 'Tahun',
      submitButton: 'Kirim',
      backButton: 'Kembali'
    }
  }
}

export default{
    name: 'age-check-modal',
    i18n: i18Texts,
    data(){
        return {
            showModal: false,
            currentYear: (new Date()).getFullYear(),
            dobMonth: 1,
            dobYear: (new Date()).getFullYear() - (1 + 9),
            dobDate: 1,
            error: false
        }
    },
    methods:{
        openModal(){
            this.showModal = true
        },
        toMonthString(monthNumber){
            const date = new Date();
            date.setMonth(monthNumber - 1);

            return date.toLocaleString('id-ID', {
                month: 'short',
            });
        },
        async submitAge(){
            const seventeenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 17))
            let dob = new Date(`${this.dobMonth}-${this.dobDate}-${this.dobYear}`)
            if(isNaN(dob.getMonth())){
                const fullDate = `${this.dobYear}-${this.dobMonth}-${this.dobDate} 00:00:00`;
                const arr = fullDate.split(/[- :]/);
                dob = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
            }
            if(dob > seventeenYearsAgo){
                this.error = true
            }else{
                const authStore = useAuthStore()
                try{
                    await authStore.updateDateOfBirth(dob)
                }catch(err){
                    console.error(err)
                    this.error = true
                    return
                }
                this.showModal = false
            }
        },
        goBack(){
            this.$router.push({ name: 'Dashboard' })
        }
    }
}
</script>

<style scoped>
</style>