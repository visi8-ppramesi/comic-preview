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
                        <component v-if="asyncComponents[idx]" :is="asyncComponents[idx]"></component>
                    </router-link>
                </template>
            </template>
        </vueper-slide>
    </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { doc, getDoc } from 'firebase/firestore'
import fb from '@/firebase/firebase.js'
// import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
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
        }
    },
    watch: {
        banners(){
            if(this.banners.map(v => v.type).includes('component')){
                this.banners.forEach((banner, idx) => {
                    if(banner.type == 'component'){
                        const fetcherFunc = async function(){
                            const docRef = doc(fb.db, 'async_components', banner.async_component)
                            const snap = await getDoc(docRef)
                            const data = snap.data()
                            return data
                        }
                        this.asyncComponents[idx] = this.asyncComponentLoader(fetcherFunc)
                    }
                })
            }
        }
    },
    inject: [
        'routeResolver'
    ],
    props: {
        banners: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
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