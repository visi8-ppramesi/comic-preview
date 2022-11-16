<template>
    <div></div>
</template>

<script>
import { useMeta } from 'vue-meta'
export default {
    name: 'faq',
    setup () {
        useMeta(
            {
                title: 'FAQ Page',
                meta: [
                    { property: 'og:title', content: 'FAQ Page' },
                    { property: 'og:description', content: 'Frequently ask question' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/faq' },
                ]
            },
        )
    },
}
</script>

<style scoped>

</style>