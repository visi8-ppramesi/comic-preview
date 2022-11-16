<template>
    <div class="mb-3 text-white">
        <div class="px-5 py-5">
            <div class="flex items-center justify-between mb-2">
                <div id="authors-title">{{title}}</div>
            </div>
            <div class="flex flex-col mb-2">
                <label id="authors-sort" class="block text-sm leading-5 font-medium">{{ $t("sort") }}</label>
                <select id="author-sort-select" class="form-select appearance-none
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
                    <option value="last_updated">{{ $t("updated") }}</option>
                    <option value="view_count">{{ $t("views") }}</option>
                </select>
            </div>
            <grid
                id="authors-grid"
                :items="authors"
                :config="config"
                objectCategory="all"
                :paginated="true"
                @loadMore="loadAuthors"
                ref="authorGrid"
            ></grid>
        </div>
    </div>
</template>

<script>
import Author from '../firebase/Author.js'
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
    name: 'authors',
    setup () {
        useMeta(
            {
                title: 'Authors Page',
                meta: [
                    { property: 'og:title', content: 'Authors Page' },
                    { property: 'og:description', content: 'authors list filter page' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/authors' },
                ]
            },
        )
    },
    i18n: i18Texts,
    components: {
        Grid
    },
    data(){
        return {
            sortByParam: 'title',
            title: '',
            authors: [],
            queryParams: {
                paginate: 12,
                page: 1
            },
            config: {
                linkName: 'Author',
                title: 'name',
                image: 'profile_picture_url',
            },
            tags: [],
            processedGenres: [],
            query: ''
        }
    },
    mounted(){
        this.query = this.$route.query.category ? this.$route.query.category : 'all'
        this.title = startCase(toLower(this.query + ' authors'))
        this.loadAuthors()
        // Author.getDocumentsWithStorageResource(categoryQueryPaginated(this.query, this.sortByParam), ['profile_picture_url']).then((authors) => {
        //     this.authors.push(...authors)
        //     this.$refs.authorGrid.stopLoading()
        // })
    },
    methods: {
        changeSort(){
            this.loadAuthors(true)
            // Author.getDocumentsWithStorageResource(categoryQueryPaginated(this.query, this.sortByParam), ['profile_picture_url']).then((authors) => {
            // })
        },
        loadAuthors(startOver = false){
            this.$refs.authorGrid.startLoading()
            const lastRef = this.authors[this.authors.length - 1] && !startOver ? this.authors[this.authors.length - 1].doc : null
            Author.getDocumentsWithStorageResourceUrl(categoryQueryPaginated(this.query, this.sortByParam, lastRef), ['profile_picture_url']).then((authors) => {
                this.$refs.authorGrid.stopLoading()
                if(startOver){
                    this.authors = authors
                }else{
                    this.authors.push(...authors)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>