<template>
    <div id="logout-loading">{{ $t("log-out") }}</div>
</template>

<script>
import { useAuthStore } from '../store/auth.js'

const i18Texts = {
  messages: {
    en: {
        'log-out': 'Logging out...'
    },
    id: {
        'log-out': 'Keluar...'
    }
  }
}

export default {
    i18n: i18Texts,
    setup(){
        const authStore = useAuthStore()

        return {
            authStore
        }
    },
    mounted() {
        this.authStore.logout(() => {
            this.$router.push({ name: 'Login' })
        }, () => {})
    }
}
</script>
