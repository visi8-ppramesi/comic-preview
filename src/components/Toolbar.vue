<template>
    <div class="bg-white h-fit flex rounded-full shadow-2xl divide-x-2 w-fit border border-slate-200">
        <button class="rounded-l-full px-2" @click="backPress">
            <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M31 36L19 24L31 12" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button class="px-1 flex items-center" @click="upPress">
            <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M13 30L25 18L37 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button class="rounded-r-full px-2" @click="forwardPress">
            <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M19 12L31 24L19 36" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'tool-bar',
    methods: {
        backPress(){
            this.$emit('back')
        },
        upPress(){
            this.$emit('up')
        },
        forwardPress(){
            this.$emit('forward')
        }
    }
}
</script>

<style>

</style>
