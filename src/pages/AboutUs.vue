<template>
    <div class="text-white divide-y">
        <div>
            <div id="about-us-title" class="text-4xl text-center p-3">{{ $t("title") }}</div>
            <div class="justify-end items-center bg-blue-100 w-full h-52" :style="'background-size:cover;background-position:center;background-image: linear-gradient(rgba(245, 246, 252, 0) 50%, rgb(49 46 129)), url('+ background +');'">
            </div>
            <div id="about-us-description" class="p-3 text-center">
                {{ $t("description") }}
            </div>
        </div>
        <!-- <div>
            <div>
                <div class="flex mt-7 ml-20 lg:object-center lg:px-96">
                    <div>
                        <img class="w-24 h-24 rounded-full" src="/storage/media/covers/kara.jpg" />
                        <div class="mt-3">CEO Of Visi8</div>
                    </div>
                    <div class="ml-7">
                        <img class="w-24 h-24 rounded-full" src="/storage/media/covers/kara.jpg" />
                        <div class="mt-3">CO-FOUNDER</div>
                    </div>
                </div>
                <div class="p-3 text-center">
                    It’s 3D Animated movie , about a young guardian of the magical realms, who is curious yet skeptical toward humans, must cooperate with two mysterious human time explorers in order to find the source of anomalies, before the destructions spreads too far.

                    The project itself will develop it’s IP, through movies, games, AR & VR Experience, as well as merchandising and licensing for both national and international market.

                    This project is currently still being produced by our in-house production.
                </div>
            </div>
        </div> -->
        <div>
            <div id="about-us-title2" class="text-2xl text-center text-white py-3">{{ $t("title2") }}</div>
            <div class="mb-7">
                <div class="grid grid-cols-3 divide-x divide-green-500 lg:mt-10">
                    <div id="about-us-services-design" class="text-center px-3">{{ $t("services.design") }}</div>
                    <div>
                        <div id="about-us-services-web" class="text-center px-3">{{ $t("services.web") }}</div>
                    </div>
                    <div>
                        <div id="about-us-services-animation" class="text-center px-3">{{ $t("services.animation") }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useMeta } from 'vue-meta'
const i18Texts = {
  messages: {
    en: {
      title: 'About Visi8',
      description: `it’s 3D Animated movie, about a young guardian of the magical realms, who is curious yet skeptical toward humans, must cooperate with two mysterious human time explorers in order to find the source of anomalies, before the destructions spreads too far. The project itself will develop it’s IP, through movies, games, AR & VR Experience, as well as merchandising and licensing for both national and international market. This project is currently still being produced by our in-house production.`,
      ceo: 'CEO Of Visi8',
      cofounder: 'CO-FOUNDER',
      title2: 'WHAT WE DO',
      services: {
        design: 'AR and 3D Design',
        web: 'Web and Apps',
        animation: 'Animation Movie'
      }
    },
    id: {
        title: "Tentang Visi8",
        description: `Kara merupakan film animasi 3d, bercerita tentang seorang penjaga yang berasal dari alam yang magis, yang penasaran namun juga memiliki keraguan terhadap manusia. Kara harus bekerja sama dengan dua manusia penjelajah waktu yang misterius untuk menemukan sumber anomali sebelum kehancuran menyebar terlalu jauh. Project kara tersebut akan dikembangkan melalui animasi, permainan, pengalaman AR dan VR, serta akan mengambil pasar nasional dan internasional. Projek ini saat ini masih diproduksi di rumah produksi kami.`,
        title2: "Apa yang Kita Lakukan",
        ceo: "CEO Visi8",
        services: {
            design: "Desain AR dan 3D",
            web: "Web dan Aplikasi",
            animation: "Animasi Movie"
        }
    }
  }
}
// import AppLayout from '@/Layouts/AppLayout.vue'
export default {
    name: 'about-us',
    setup () {
        useMeta(
            {
                title: 'About Us Page',
                meta: [
                    { property: 'og:title', content: 'About Us Page' },
                    { property: 'og:description', content: 'description about visi8 company' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/about-us' },
                ]
            },
        )
    },
    i18n: i18Texts,
    data(){
        return {
            background: require('@/assets/kara.jpg')
        }
    },
    components: {
        // AppLayout,
    },
}
</script>
