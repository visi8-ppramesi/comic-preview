<template>
  <div class="pa-2 w-full">
    <div
      id="banner"
      class="drop-shadow-md flex flex-col justify-end items-center bg-blue-100 w-150 featured-block w-full h-screen"
    >
      <video-banner></video-banner>
    </div>

    <div>
      <div
        class="bg-gradient-to-tr from-purple-900 to-purple-700 py-16 h-full w-full flex items-center justify-center"
      >
        <div
          class="w-full max-w-5xl 2xl:max-w-screen-2xl text-center text-white"
        >
          <div class="text-center pb-8 lg:text-4xl font-bold py-2">
            Visi8 News
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3">
            <div v-for="item in news" :key="item.id">
              <div class="px-2 pb-5">
                <img
                  class="justify-center w-full h-32 object-cover"
                  :src="item.image"
                />
                <div class="text-sm flex pt-1">
                  <div>{{ item.date }}</div>
                  <div class="px-3">{{ item.category }}</div>
                </div>
                <div class="font-bold text-lg text-left"><a :href="item.url" class="underline">{{ item.title }}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        :style="image"
        id="content-list-container"
        class="drop-shadow-md relative md:min-h-[1200px] flex items-center justify-center bg-no-repeat bg-top bg-cover titles-container text-white overflow-hidden"
      >
        <div id="content-list-background">
          <img
            id="content-list-background-image"
            class="object-top object-cover min-h-full w-full"
            alt="bg-img"
            ref="imageBackground"
            :src="imgBg"
          />
        </div>
        <div
          class="bg-black/50 z-10 pt-16 pb-16 flex items-center justify-center w-full md:min-h-[1200px]"
        >
          <div class="flex items-center justify-center">
            <div class="max-w-5xl 2xl:max-w-screen-2xl">
              <div
                id="dashboard-titles"
                class="text-center font-ubuntu font-bold text-3xl sm:text-4xl xl:text-5xl"
              >
                {{ $t("titles") }}
              </div>
              <div class="flex items-center justify-center">
                <div
                  class="h-full w-full mt-3 sm:w-full sm:grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3"
                >
                  <div
                    class="content-card-container container text-center mt-14 sm:px-5 sm:mb-5"
                  >
                    <div
                      class="flex items-center justify-center bg-rounded-full"
                    >
                      <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'SSb0da8HXyie7DbcAEve' },
                            {},
                            'string'
                          )
                        "
                      >
                        <img
                          alt="titles1"
                          class="lg:h-48 lg:w-48 md:h-40 md:w-40 h-36 w-36 bg-cover rounded-full shadow-md drop-shadow-md"
                          :src="kara"
                        />
                      </router-link>
                    </div>
                    <div
                      id="dashboard-titles-item1"
                      class="text-xl lg:text-2xl pt-5 font-ubuntu"
                    >
                      {{ $t("comicTitle1") }}
                    </div>
                    <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'SSb0da8HXyie7DbcAEve' },
                            {},
                            'string'
                          )
                        "
                      >
                        <button class="mt-5 text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("readPreview") }}</button>
                    </router-link>
                    <div
                      id="dashboard-desc-item1"
                      class="text-base pt-5 lg:text-lg font-open-sans"
                    >
                      {{ $t("karaDescription") }}
                    </div>
                  </div>
                  <div
                    class="content-card-container container text-center mt-14 sm:px-5 sm:mb-5"
                  >
                    <div class="flex items-center justify-center">
                      <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'C92HPPzTxMzlV7i5gE5b' },
                            {},
                            'string'
                          )
                        "
                      >
                        <img
                          alt="titles2"
                          class="lg:h-48 lg:w-48 md:h-40 md:w-40 h-36 w-36 bg-cover rounded-full shadow-md drop-shadow-md"
                          :src="changelings"
                        />
                      </router-link>
                    </div>
                    <div
                      id="dashboard-titles-item2"
                      class="text-xl lg:text-2xl pt-5 font-ubuntu"
                    >
                      {{ $t("comicTitle2") }}
                    </div>
                    <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'C92HPPzTxMzlV7i5gE5b' },
                            {},
                            'string'
                          )
                        "
                      >
                        <button class="mt-5 text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("readPreview") }}</button>
                    </router-link>
                    <div
                      id="dashboard-desc-item2"
                      class="text-base pt-5 lg:text-lg font-open-sans"
                    >
                      {{ $t("changelingsDescription") }}
                    </div>
                  </div>
                  <div
                    class="content-card-container container text-center mt-14 sm:px-5 sm:mb-5"
                  >
                    <div class="flex items-center justify-center">
                      <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'xFpjBfVeF4d1XSBQexKV' },
                            {},
                            'string'
                          )
                        "
                      >
                        <img
                          alt="titles3"
                          class="lg:h-48 lg:w-48 md:h-40 md:w-40 h-36 w-36 bg-cover rounded-full shadow-md drop-shadow-md"
                          :src="galeo"
                        />
                      </router-link>
                    </div>
                    <div
                      id="dashboard-titles-item3"
                      class="text-xl lg:text-2xl pt-5 font-ubuntu"
                    >
                      {{ $t("comicTitle3") }}
                    </div>
                    <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'xFpjBfVeF4d1XSBQexKV' },
                            {},
                            'string'
                          )
                        "
                      >
                        <button class="mt-5 text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("readPreview") }}</button>
                    </router-link>
                    <div
                      id="dashboard-desc-item3"
                      class="text-base pt-5 lg:text-lg font-open-sans"
                    >
                      {{ $t("galeoDescription") }}
                    </div>
                  </div>
                  <div
                    class="content-card-container container text-center mt-14 sm:px-5 sm:mb-5"
                  >
                    <div class="flex items-center justify-center">
                      <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'B114It2pQmMTIb6JIjGc' },
                            {},
                            'string'
                          )
                        "
                      >
                        <img
                          alt="titles4"
                          class="lg:h-48 lg:w-48 md:h-40 md:w-40 h-36 w-36 object-cover rounded-full shadow-md drop-shadow-md"
                          :src="seventh"
                        />
                      </router-link>
                    </div>
                    <div
                      id="dashboard-titles-item4"
                      class="text-xl lg:text-2xl pt-5 font-ubuntu"
                    >
                      {{ $t("comicTitle4") }}
                    </div>
                    <router-link
                        :to="
                          routeResolver(
                            'Comic',
                            { id: 'B114It2pQmMTIb6JIjGc' },
                            {},
                            'string'
                          )
                        "
                      >
                        <button class="mt-5 text-xs lg:text-lg items-center min-h-8 w-116  p-2 rounded-lg text-gray-50 bg-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">{{ $t("readPreview") }}</button>
                    </router-link>
                    <div
                      id="dashboard-desc-item4"
                      class="pb-16 text-base pt-5 lg:text-lg font-open-sans"
                    >
                      {{ $t("seventhDescription") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted } from 'vue-demi'
// import Banner from '../components/Banner.vue'
import VideoBanner from "../asyncComponents/VideoBanner.vue";
import Comic from "../firebase/comics/Comic.js";
import Author from "@/firebase/Author";
import Setting from "@/firebase/Setting";
import { useMeta } from "vue-meta";
import { authorLimitTen, orderByLimit } from "../firebase/utils/queries.js";
// import { where } from 'firebase/firestore'
// import Tag from '../firebase/Tag.js'
// import UserRole from '../firebase/UserRole.js'
// import { ref } from 'vue'

const i18Texts = {
  messages: {
    en: {
      readPreview: "Read Preview",
      title1: "All Comics",
      title2: "Adventure",
      title3: "Science Fiction",
      show: "Show More",
      authors: "Authors",
      karaDescription:
        "Follow the journey of Kara, as she navigates the meaning of the duties imposed to her, while unwittingly tapping her hidden potentials and finding her place among modern humans.",
      changelingsDescription:
        "Throughout time, children have been chosen – seemingly at random intervals – a human child and a demon from the Hantu spirit plane. These children are destined to battle each other for the sake of mankind, with one seeking peace and the other wanting only to plunge the world into darkness and chaos. Changelings tell the story of a demon named Arga who must match wits and strength against Durjana – a human raised by spirits in a dark and desolate world.",
      galeoDescription:
        "Galeo is afraid to participate in the Ikiro Trials, a dangerous rite-of-passage that makes children of the seas into mighty seawalkers. In a freak accident which destroys the temple trials, Galeo cannot complete the trials, resulting in his family getting banished and his father missing. In their exile, Galeo’s younger sister, Adeleo runs away from home to chase sea-ghosts, which she believes can bring her to their father. Although scared, Galeo goes after Adeleo braving the open seas and dangerous sea-forests. Along his journey, Galeo is forced to face his pas-demons and overcome natural challenges identical to those of the Ikiro Trials.",
      seventhDescription:
        "When a powerful figure in the criminal underworld of Indonesia is found murdered in an almost ritualistic slaying, an investigation follows that leads to a mysterious group of immortals dating back more than a thousand years—The Seven Tigers. These people have carved out their own power centers throughout Asia and have held a peaceful truce for centuries. That truce is over.",
      comicTitle1: "Kara Guardian of The Realms",
      comicTitle2: "Changelings",
      comicTitle3: "Galeo of The Seawalkers",
      comicTitle4: "Seventh Tiger",
      titles: "Preview Our Titles",
      aboutTitle: "About Us",
      aboutDescription1: `This journey began several years ago when Raiyan Laksamana and Farid Siddik were working together to tell stories through animation and film. Along the way, they met comic book creator Kevin VanHook and after more than a year of looking at ways the three could collaborate, it was decided to start telling many of their original stories with comics, as well as in animated and live-action form. Thus creating Visi8 Entertainment.`,
      aboutDescription2: `Visi8 Entertainment aims to develop stories into various media such as animation, Augmented Reality (AR), Virtual Reality (VR), Extended Reality (XR), live-action films, and even games. By combining the latest technology with compelling stories, Visi 8 aspires to present locally created content on to the international stage.`,
      welcomeTitle: "Welcome To Visi8 Webcomic",
      welcomeDescription: `On our website, you will find various comic titles made by diverse creators across Indonesia. Here, you could read comics as easy as scrolling through your favorite social media app. Discover a more dynamic reading experience with moving panels complete with voice overs and sounds. And don’t forget to see characters coming to life through Augmented Reality (AR). Tap on one of our titles below and find out!`,
    },
    id: {
      readPreview: "Baca",
      title1: "Semua Komik",
      title2: "Petualangan",
      title3: "Fiksi Ilmiah",
      show: "Lihat Lebih Banyak",
      authors: "Penulis",
      karaDescription:
        "Ikuti perjalanan kara, saat dia menjelajahi arti dari tugas yang dibebankan padanya, tanpa disadari menggunakan potensi tersembunyi yang dimilikinya dan menemukan tempatnya diantara manusia modern.",
      changelingsDescription:
        "Sepanjang waktu, anak-anak telah dipilih – tampaknya secara acak – seorang anak manusia dan iblis dari alam roh Hantu. Anak-anak ini ditakdirkan untuk berperang satu sama lain demi umat manusia, dengan satu mencari perdamaian dan yang lain hanya ingin menjerumuskan dunia ke dalam kegelapan dan kekacauan. Changelings bercerita tentang iblis bernama Arga yang harus menandingi kecerdasan dan kekuatannya melawan Durjana – manusia yang dibesarkan oleh roh di dunia yang gelap dan sunyi.",
      galeoDescription:
        "Galeo takut untuk ikut berpartisipasi kedalam percobaan Ikiro, sebuah upacara peralihan yang berbahaya agar membuat anak-anak laut menjadi penjelajah laut yang hebat. Didalam kecelakaan aneh yang menghancurkan kuil percobaan, galeo tidak dapat menyelesaikan percobaan tersebut, yang mengakibatkan keluarganya dibuang dan ayahnya hilang. Didalam pengasingan mereka, adik perempuan galeo yang paling muda, Adeleo pergi dari rumah untuk mengejar hantu laut, yang dia percayai bisa membawa dia kepada kepada ayah mereka. Wakaupun takut, galeo mengejar Adeleo yang pergi ke laut lepas dan hutan berbahaya. Didalam perjalannya galeo dipaksa untuk menghadapi iblis dan berbagai tantangan yang sangat mirip dengan percobaan Ikiro.",
      seventhDescription:
        "Ketika sosok kuat di dunia kriminal Indonesia ditemukan terbunuh dalam pembunuhan ritualistik, sebuah penyelidikan yang mengikuti mengarah ke suatu kelompok misterius abadi yang berusia lebih dari seribu tahun - seven tigers. Orang-orang ini telah membangun kekuasaan mereka di seluruh Asia dan telah mengadakan genjatan senjata secara damai selama berabad-abad. namun gencatan senjata itu telah berakhir.  ",
      comicTitle1: "Kara Guardian of The Realms",
      comicTitle2: "Changelings",
      comicTitle3: "Galeo of The Seawalkers",
      comicTitle4: "Seventh Tiger",
      titles: "Pratinjau Komik Kami",
      aboutTitle: "Tentang Kami",
      aboutDescription1: `Perjalanan ini dimulai dari beberapa tahun yang lalu ketika Raiyan Laksamana dan Farrid Siddik sedang bekerja sama untuk memberikan sebuah cerita melalui animasi dan film. Selama perjalanan, mereka bertemu kreator buku komik yaitu Kevin Vanhook dan setelah setahun lebih memikirkan jalan agar bisa berkolaborasi bersama, akhirnya memutuskan untuk mulai menceritakan banyak cerita asli mereka dengan komik, serta dalam bentuk animasi maupun live-action. Sehingga terciptalah Visi8 Entertaiment.`,
      aboutDescription2: `Visi8 Entertaiment bertujuan untuk membuat sebuah cerita ke dalam berbagai jenis media diantaranya animasi, Augmented Reality (AR),  Virtual Reality (VR), Extended Reality (XR), film live-action, bahkan permainan. Dengan menggabungkan teknologi terbaru dengan cerita yang menarik, Visi 8 bercita-cita untuk menyajikan konten buatan lokal kedalam panggung internasional. `,
      welcomeTitle: "Selamat Datang di Visi8 Webcomic",
      welcomeDescription:
        "Didalam website kita ini, terdapat berbagai judul komik yang dibuat oleh kreator-kreator beragam dari seluruh Indonesia. Disini, kamu bisa membaca komik dengan mudah seperti bermain dengan media sosial favorit kamu. Temukan pengalaman membaca yang berbeda dengan panel yang bergerak serta dilengkapi dengan voice over dan suara, dan jangan lupa untuk melihat berbagai jenis karakter yang keluar dari komik dengan menggunakan AR. Pilih salah dari judul di bawah dan temukan!",
    },
  },
};

export default {
  name: "dashboard-page",
  i18n: i18Texts,
  // metaInfo: {
  //   title: 'My Example App',
  //   titleTemplate: '%s - Yay!',
  // },
  setup() {
    useMeta({
      title: "Home",
      meta: [
        { property: "og:title", content: "Home" },
        { property: "og:description", content: "kara comic, and 4 others" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://visi8-webcomic.net" },
      ],
    });
  },
  components: {
    VideoBanner,
  },
  inject: ["routeResolver"],
  methods: {
    processToAuthorHorizontalSlider() {},
    async fetchBanners() {
      const banners = await Setting.getBanners();
      this.banners = banners.value;
    },
    async fetchComics() {
      const comicGenerator = Comic.generateDocumentsWithStorageResource(
        orderByLimit,
        ["cover_image_url"]
      );
      for await (let comic of comicGenerator) {
        this.comics.push(comic);
      }
    },
    async fetchAuthors() {
      const authorGenerator = Author.generateDocumentsWithStorageResource(
        authorLimitTen,
        ["profile_picture_url"]
      );
      for await (let author of authorGenerator) {
        this.authors.push(author);
      }
    },
    animateElement() {
      const containerRect = document
        .getElementById("content-list-container")
        .getBoundingClientRect();
      // const imageRect = document.getElementById('content-list-background-image').offsetHeight//.getBoundingClientRect()
      const top = Math.abs(containerRect.top * 0.375);
      this.$refs.imageBackground.style.transform = `translate3d(0, ${top}px, 0)`;
    },
    scrollHandler() {
      window.requestAnimationFrame(() => {
        const top = document
          .getElementById("content-list-container")
          .getBoundingClientRect().top;
        if (top < 0) {
          this.animateElement();
        } else {
          this.$refs.imageBackground.style.transform = `translate3d(0, 0px, 0)`;
        }
      });
    },
    resizeImage() {
      const height =
        document
          .getElementById("content-list-container")
          .getBoundingClientRect().height * 1.15;
      document.getElementById("content-list-background-image").style.height =
        height + "px";
    },
  },
  computed: {
    karaOnly() {
      return "true" == process.env.VUE_APP_KARA_ONLY;
    },
  },
  data() {
    return {
      image: {
        // backgroundImage: `url(${require('@/assets/banner_1.jpg')})`,
        "--var-background-image": `url(${require("@/assets/banner_1.jpg")})`,
        "--var-transform-translate": "0px",
      },
      imgBg: require("@/assets/banner_1.jpg"),
      comics: [],
      authors: [],
      testa: [],
      testb: [],
      banners: [],
      kara: require("@/assets/kara_crop.jpg"),
      galeo: require("@/assets/galeo_crop.jpg"),
      changelings: require("@/assets/changelings_crop.jpg"),
      seventh: require("@/assets/seventh_tiger2.jpg"),
      raiyan: require("@/assets/Raiyan.jpg"),
      farrid: require("@/assets/Farrid.jpg"),
      comicConfig: {
        linkName: "Comic",
        title: "title",
        image: "cover_image_url",
      },
      authorConfig: {
        linkName: "Author",
        title: "name",
        image: "profile_picture_url",
      },
      news: [
        {
          title: "News 1",
          date: "11/09/2022",
          category: "comic",
          image: require("@/assets/kara_crop.jpg"),
          url: "https://google.com"
        },
        {
          title: "News 2",
          date: "11/09/2022",
          category: "comic",
          image: require("@/assets/kara_crop.jpg"),
          url: "https://google.com"
        },
        {
          title: "News 3",
          date: "11/09/2022",
          category: "comic",
          image: require("@/assets/kara_crop.jpg"),
          url: "https://google.com"
        },
      ],
    };
  },
  mounted() {
    if (!this.karaOnly) {
      this.fetchComics();
      this.fetchAuthors();
    }
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (f) {
        setTimeout(f, 1000 / 60);
      };

    // this.resizeImage()
    // window.addEventListener('resize', this.resizeImage)
    window.addEventListener("scroll", this.scrollHandler);
    // this.fetchBanners()
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  created() {
    // Comic.getDocuments().then((docs) => {
    //     this.comics = docs
    // })
  },
  // setup(){
  //     let comics = ref([])
  //     onMounted(async () => {
  //         comics.value = await Comic.getDocuments()
  //     })

  //     return {
  //         comics
  //     }
  //     // Comic.getDocuments().then((instances) => {
  //     // })
  //     // Tag.getDocuments().then((instances) => {
  //     // })
  //     // UserRole.getDocuments().then((roles) => {
  //     // })
  // }
};
</script>

<style scoped>
.content-card-container {
  transition: 0.3s;
  height: fit-content;
  border-radius: 0.375rem;
  border: 1px rgba(108, 108, 108, 0) solid;
  background: rgba(0, 0, 0, 0);
  padding: 12px;
  filter: drop-shadow(0 0px 0px rgb(0 0 0 / 0))
    drop-shadow(0 0px 0px rgb(0 0 0 / 0));
}
.content-card-container:hover {
  transform: scale(1.1, 1.1);
  border: 1px rgb(108, 108, 108) solid;
  background: rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  padding-top: 40px;
  padding-bottom: 40px;
}
/* #content-list-container::before{
    content: ' ';
    position: absolute;
    background-image: var(--var-background-image);
    transform: translateY(var(--var-transform-translate));
    width: 100%;
    height: 100%;
    z-index: 1;
} */
#content-list-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>

<style>
.subsubtitle {
  color: #41b3a9;
}
.featured-block {
  /* height: calc(100vh - 64px); */
  background-size: cover;
  background-position: center;
}

.vueperslides,
.vueperslides__inner,
.vueperslides__parallax-wrapper,
.vueperslides__track {
  height: inherit;
}

.vueperslides__parallax-wrapper {
  padding-bottom: 0 !important;
}
</style>