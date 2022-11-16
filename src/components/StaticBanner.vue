<template>
    <vueper-slides :infinite="false" slide-image-inside class="w-full">
        <vueper-slide v-for="(banner, idx) in banners" :key="idx" :title="banner.title">
         <!-- :image="banner.banner_image_url" :link="routeResolver(banner.target_type, {id: banner.target}, {}, 'string')"> -->
            <template #content>
                <template v-if="banner.type === 'image'">
                    <router-link :to="routeResolver(banner.target_type, {id: banner.target}, {}, 'string')">
                        <mq-responsive target="sm-" tag="span">
                            <img class="w-full h-full object-cover" :src="banner.banner_image_url" alt="">
                        </mq-responsive>
                        <mq-responsive target="md+" tag="span">
                            <img class="w-full h-full object-cover" :src="banner.banner_image_url_wide ? banner.banner_image_url_wide : banner.banner_image_url" alt="">
                        </mq-responsive>
                    </router-link>
                </template>
                <template v-else-if="banner.type === 'component'">
                    <router-link :to="routeResolver(banner.target_type, {id: banner.target}, {}, 'string')">
                        <component v-if="banner.component" :is="banner.component"></component>
                    </router-link>
                </template>
            </template>
        </vueper-slide>
    </vueper-slides>
</template>

<script>
// import { VueperSlides, VueperSlide } from 'vueperslides'
import VueperSlide from './VueperSlide/VueperSlide.vue'
import VueperSlides from './VueperSlide/VueperSlides.vue'
import 'vueperslides/dist/vueperslides.css'
import VideoBanner from '@/asyncComponents/VideoBanner.vue'
// import GaleoBanner from '@/asyncComponents/GaleoBanner.vue'
// import ChangelingsBanner from '@/asyncComponents/ChangelingsBanner.vue'
// import SeventhTigerBanner from '@/asyncComponents/SeventhTigerBanner.vue'
// import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
    name: 'static-banner',
    components: {
        VueperSlides,
        VueperSlide,
        // Carousel,
        // Slide,
        // Pagination,
        // Navigation
    },
    data(){
        return {
            videoSrc: null,
            imgSrc: null,
            asyncComponents: [],
            banners: [
                {
                    title: 'Kara: Guardian of Realms',
                    type: 'component',
                    target_type: 'Comic',
                    target: 'SSb0da8HXyie7DbcAEve',
                    component: VideoBanner
                },
                // {
                //     title: 'Changelings',
                //     type: 'component',
                //     target_type: 'Comic',
                //     target: 'C92HPPzTxMzlV7i5gE5b',
                //     component: ChangelingsBanner
                // },
                // {
                //     title: 'Galeo',
                //     type: 'component',
                //     target_type: 'Comic',
                //     target: 'xFpjBfVeF4d1XSBQexKV',
                //     component: GaleoBanner
                // },
                // {
                //     title: 'Seventh Tiger',
                //     type: 'component',
                //     target_type: 'Comic',
                //     target: 'B114It2pQmMTIb6JIjGc',
                //     component: SeventhTigerBanner
                // },
            ]
        }
    },
    inject: [
        'routeResolver'
    ],
    methods: {
        goToItem(route){
            this.$inertia.visit(route(route.name, route.params))
        }
    },
    setup() {
        const onSwiper = (swiper) => {
            this.logger(swiper);
        };
        const onSlideChange = () => {
            this.logger('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
        };
    },
}
</script>

<style scoped>
.transform{
    transform: rotate(180deg);
}
</style>