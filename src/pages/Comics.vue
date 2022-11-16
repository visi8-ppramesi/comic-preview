<template>
    <div class="mb-3 text-white md:w-288 md:mx-auto">
        <div class="px-5 py-5">
            <div class="flex items-center justify-between mb-2">
                <div id="comics-title">{{title}}</div>
            </div>
            <div class="flex flex-col md:w-1/4 mb-2">
                <label id="comics-sort" class="block text-sm leading-5 font-medium">{{ $t("sort") }}</label>
                <select id="comics-select" class="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    aria-label="Default select example"
                    v-model="sortByParam"
                    @change="changeSort"
                >
                    <option value="title" selected>{{ $t("title") }}</option>
                    <option value="release_date">{{ $t("release") }}</option>
                    <option value="last_update">{{ $t("updated") }}</option>
                    <option value="view_count">{{ $t("views") }}</option>
                </select>
            </div>
            <grid
                :items="comics"
                :config="config"
                objectCategory="all"
                :paginated="true"
                @loadMore="loadComics(false)"
                ref="comicGrid"
            ></grid>
        </div>
    </div>
</template>

<script>
import Comic from '../firebase/comics/Comic.js'
import { categoryQueryPaginated } from '../firebase/utils/queries.js'
// import _ from 'lodash'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'
import Grid from '../components/Grid.vue'
import { useMeta } from 'vue-meta'

const i18Texts = {
  messages: {
    en: {
      sort: 'Sort By',
      title: 'Title',
      release: 'Release Date',
      updated: 'Last Updated',
      views: 'views'
    },
    id:{
        sort: 'Diurut berdasarkan',
        title: 'Judul',
        release: 'Tanggal Rilis',
        updated: 'Terakhir Diperbarui',
        views: 'Dilihat'
    }
  }
}
export default {
    name: 'comics',
    setup () {
        useMeta(
            {
                title: 'Comics Page',
                meta: [
                    { property: 'og:title', content: 'Comics Page' },
                    { property: 'og:description', content: 'Comics list filter page' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/comics' },
                ]
            },
        )
    },
    components: {
        Grid
    },
    i18n: i18Texts,
    data(){
        return {
            sortByParam: 'title',
            title: '',
            comics: [],
            queryParams: {
                paginate: 12,
                page: 1
            },
            config: {
                linkName: 'Comic',
                title: 'title',
                image: 'cover_image_url',
            },
            tags: [],
            processedGenres: [],
            query: ''
        }
    },
    mounted(){
        this.query = this.$route.query.category ? this.$route.query.category : 'all'
        this.title = startCase(toLower(this.query + ' comics'))
        this.loadComics(false)
        // Comic.getDocumentsWithStorageResource(categoryQueryPaginated(this.query, this.sortByParam), ['cover_image_url']).then((comics) => {
        //     this.comics.push(...comics)
        //     this.$refs.comicGrid.stopLoading()
        // })
    },
    methods: {
        changeSort(){
            this.loadComics(true)
            // Comic.getDocumentsWithStorageResource(categoryQueryPaginated(this.query, this.sortByParam), ['cover_image_url']).then((comics) => {
            // })
        },
        loadComics(startOver = false){
            this.$refs.comicGrid.startLoading()
            const lastRef = this.comics[this.comics.length - 1] && !startOver ? this.comics[this.comics.length - 1].doc : null
            Comic.getDocumentsWithStorageResourceUrl(categoryQueryPaginated(this.query, this.sortByParam, lastRef), ['cover_image_url']).then((comics) => {
                this.$refs.comicGrid.stopLoading()
                if(startOver){
                    this.comics = comics
                }else{
                    this.comics.push(...comics)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>