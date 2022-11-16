<template>
    <div class="scrolling-wrapper">
        <div v-for="(item, idx) in items" class="horizontal-slider-items w-12 card scroller-container mr-1 bg-gradient-to-t from-indigo-900 to-indigo-400" :key="'item-' + idx">
            <router-link :to="routeResolver(config.linkName, {id: item.id})">
                <div class="text-sm p-2 image scroller-block text-white flex flex-col justify-end" :style="'background-image:linear-gradient(to bottom, rgba(245, 246, 252, 0), rgb(0 0 0 / 73%)), url(' + item[config.image] + ');'">
                    {{item[config.title]}}
                </div>
            </router-link>
        </div>
        <!-- <div v-if="items.nextPageUrl" class="bg-green-500 w-20 px-5 flex justify-center items-center rounded-lg text-center" @click="loadMore">load more</div> -->
    </div>
</template>

<script>
export default {
    name: 'horizontal-slider',
    inject: [
        'routeResolver'
    ],
    emits: ['nextPage'],
    props: {
        items: {
            type: Array,
            default: () => []
        },
        config: {
            type: Object,
            default: () => {return {}}
        },
        objectCategory: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
        }
    },
    methods:{
        test(){
            this.logger(this.items)
        },
        loadMore(){
            this.$emit('nextPage', this.objectCategory)
        }
    }
}
</script>

<style scoped>
.scrolling-wrapper{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 5px;
}
.scrolling-wrapper.card{
    flex: 0 0 auto;
}
.scrolling-wrapper::-webkit-scrollbar {
    display: none;
}
.scroller-container{
    max-height: 205px;
    min-width: 150px;
    height: 205px;
    border-radius: 10px;
}

.image{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 80px;
    max-width: 100%;
}
.scroller-block{
    height: calc(100vh - 64px);
    background-size: cover;
    background-position: center;
    max-height: 100%;
}
</style>
