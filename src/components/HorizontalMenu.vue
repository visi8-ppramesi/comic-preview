<template>
    <div class="md:overflow-x-visible overflow-x-scroll overflow-y-hidden flex flex-row h-10 bg-gray-100 py-1 px-1">
        <div v-for="(item, idx) in items" :key="idx" class="horizontal-menu-items flex-grow flex items-center justify-center font-semibold hover:text-blue-800 py-1 px-4 border border-blue-500" :class="item[config['selected']] == selected ? 'selected bg-blue-500 text-white' : 'text-blue-700 bg-transparent'">
            <Link :href="item[config['link']]">{{item[config['title']]}}</Link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'horizontal-menu',
    props: ['items', 'config', 'selected'],
    mounted(){
        let selected = document.getElementsByClassName('selected')
        if(selected.length > 0){
            selected[0].scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            })
        }
    },
}
</script>

<style scoped>

</style>
