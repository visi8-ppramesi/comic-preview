<template>
    <div class="h-screen w-full p-5 justify-center items-center flex flex-col">
        <h1 id="not-found-title" class="text-7xl text-white text-center">
            {{ $t("not-found") }}
        </h1>
        <button @click="goToHome" class="py-1 px-2 flex bg-indigo-900 w-fit mx-2 text-white rounded-lg justify-center">
            <div id="not-found-back-home-button">{{ $t("return-home") }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pl-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        </button>
    </div>
</template>

<script>
const i18Texts = {
  messages: {
    en: {
        'not-found': 'Page Not Found',
        'return-home': 'Go back Home'
    },
    id: {
        'not-found': 'Halaman Tidak Ditemukan',
        'return-home': 'Kembali ke Home'
    }
  }
}
export default {
    i18n: i18Texts,
    methods: {
        goToHome(){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>