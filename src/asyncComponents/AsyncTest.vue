<template>
    <div></div>
</template>

<script>
export default {
    name: 'test-async-component',
    props: {
        test: {
            default: '',
            type: String
        }
    },
    methods: {
        test(){
            console.log('test')
        }
    },
    mounted(){
        console.log('test-mounted')
        const test = [1,2,3]
        test.forEach(console.log)
    },
    created(){
        console.log('test-created')
        const test = [1,2,3]
        test.forEach(console.log)
    }
}
</script>