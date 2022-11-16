<template>
    <div>
        {{test}}
    </div>
</template>

<script>
export default {
    name: 'test-component',
    props: {
        test: {
            type: String,
            default: 'test'
        }
    },
    data(){
        return {
            test1: 'test'
        }
    }
}
</script>

<style scoped>

</style>