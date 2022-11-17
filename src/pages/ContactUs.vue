<template>
    <div class="w-full md:w-96 md:max-w-full mx-auto my-10">
        <div class="p-4 m-4 md:p-6 border border-gray-300 sm:rounded-md">
            <form @submit.prevent="sendContactEmail">
                <label class="block mb-6">
                    <span class="text-gray-50">{{ $t('emailAddress') }}</span>
                    <input
                        v-model="email"
                        name="email"
                        type="email"
                        class="
                            p-2
                            block
                            w-full
                            mt-1
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                        "
                        :placeholder="$t('emailExample')"
                        required
                    />
                </label>
                <label class="block mb-6">
                    <span class="text-gray-50">{{ $t('name') }}</span>
                    <input
                        v-model="name"
                        type="text"
                        name="name"
                        class="
                            p-2
                            block
                            w-full
                            mt-1
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                        "
                        placeholder="Budi Adika"
                    />
                </label>
                <label class="block mb-6">
                    <span class="text-gray-50">{{ $t('subject') }}</span>
                    <input
                        v-model="subject"
                        type="text"
                        name="subject"
                        class="
                            p-2
                            block
                            w-full
                            mt-1
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                        "
                        :placeholder="$t('subject')"
                    />
                </label>
                <label class="block mb-6">
                    <span class="text-gray-50">{{ $t('message') }}</span>
                    <textarea
                        v-model="message"
                        name="message"
                        class="
                            p-2
                            block
                            w-full
                            mt-1
                            border-gray-300
                            rounded-md
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                        "
                        rows="3"
                        :placeholder="$t('messagePlaceholder')"
                    ></textarea>
                </label>
                <div>
                    <button
                        type="submit"
                        class="text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                        {{ $t('contactUsButton') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { httpsCallable } from 'firebase/functions'
import fb from '../firebase/firebase.js'
import isEmpty from 'lodash/isEmpty'
import { useMeta } from 'vue-meta'
const i18Texts = {
    messages: {
        en: {
            emailAddress: 'Email address',
            emailExample: "email{'@'}example{'.'}com",
            subject: 'Subject',
            message: 'Message',
            messagePlaceholder: "Tell us what you're thinking about...",
            contactUsButton: 'Contact Us',
            name: 'Name',
            successMsg: 'Your message has been sent successfully',
            errorMsg: 'Something went wrong, please try again later',
            emptyErrorMsg: 'Please fill all the fields',
            emailErrorMsg: 'Please enter a valid email address',
        },
        id: {
            emailAddress: 'Alamat email',
            emailExample: "email{'@'}contoh{'.'}com",
            subject: 'Subjek',
            message: 'Pesan',
            messagePlaceholder: 'Beritahu kami tentang apa yang kamu pikirkan...',
            contactUsButton: 'Hubungi Kami',
            name: 'Nama',
            successMsg: 'Pesan Anda telah terkirim dengan sukses',
            errorMsg: 'Terjadi kesalahan, silahkan coba lagi nanti',
            emptyErrorMsg: 'Silahkan isi semua field',
            emailErrorMsg: 'Silahkan masukkan alamat email yang valid',
        },
    }
}
export default{
    name: 'about-us',
    setup () {
        useMeta(
            {
                title: 'Contact Us Page',
                meta: [
                    { property: 'og:title', content: 'Contact Us Page' },
                    { property: 'og:description', content: 'contact us form' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/contact-us' },
                ]
            },
        )
    },
    data(){
        return{
            email: '',
            subject: '',
            message: '',
            isLoading: false,
            isSuccess: false,
            isError: false,
            errorMessage: '',
            name: ''
        }
    },
    i18n: i18Texts,
    methods: {
        sendContactEmail(){
            const isFieldEmpty = [this.email, this.subject, this.message, this.name].reduce((acc, v) => acc || isEmpty(v), false)
            if(isFieldEmpty){
                this.$toast({
                    message: this.$t('emptyErrorMsg'),
                    type: "error",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
                return
            }
            if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.email)){
                this.$toast({
                    message: this.$t('emailErrorMsg'),
                    type: "error",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
                return
            }
            const { email, subject, message, name } = this
            const emailData = {name, email, subject, message}
            const sendContactEmail = httpsCallable(fb.functions, 'sendContactEmail-sendContactEmail')
            sendContactEmail(emailData)
                .then(() => {
                    this.$toast({
                        message: this.$t('successMsg'),
                        type: "success",
                        duration: 5000,
                        dismissible: true,
                        position: 'bottom'
                    })
                })
                .catch(() => {
                    this.$toast({
                        message: this.$t('errorMsg'),
                        type: "error",
                        duration: 5000,
                        dismissible: true,
                        position: 'bottom'
                    })
                })
        }
    }
}
</script>