<template>
    <div class="flex flex-col">
        <div v-for="(item, idx) in data" :key="idx">
            <Link :href="item.url">
            </Link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mobile-column',
    props: ['data', 'config']
}
</script>

<style scoped>

</style>
