<template>
        <div class="w-full md:w-192 mt-0 md:mt-5 mx-0 md:mx-auto relative flex w-full flex-wrap items-stretch">
            <input name="search" @keyup.enter="goSearch" v-model="searchQuery" type="text" placeholder="search" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10" />
            <button id="search-button" @click="goSearch" class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
        <div v-if="searching" class="flex w-full justify-center mt-4 min-h-screen-navbar">
            <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        <div v-else class="min-h-screen-navbar">
            <template v-if="comics.length > 0">
                <div id="search-query-title" class="text-center text-white mt-3" v-if="searched">{{ $t("search", {query}) }}</div>
            </template>
            <template v-else>
                <div id="search-query-not-found" class="text-center text-white mt-3" v-if="searched">{{ $t("noResult", {query}) }}</div>
            </template>
            <div class="px-5 py-5" v-if="searched && comics.length > 0">
                <div class="mb-3 text-white">
                    <div>
                        <div id="search-result-title">{{ $t("resultTitle") }}</div>
                    </div>
                    <div>
                        <grid
                            id="search-grid"
                            :items="comics"
                            :config="config"
                            objectCategory="all"
                            :paginated="true"
                            @loadMore="loadMore"
                            ref="searchGrid"
                            :showLoading="false"
                        ></grid>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import Grid from '../components/Grid.vue'
// import _ from 'lodash'
import isNil from 'lodash/isNil'
import { searchQueryArray as searchQueryHelper } from '../firebase/utils/queries.js'
import Comic from '@/firebase/comics/Comic'
import { useMeta } from 'vue-meta'

const i18Texts = {
  messages: {
    en: {
        search: 'Search results for {query}',
        noResult: 'No Result for {query} found',
        resultTitle: 'Comic Search Result'
    },
    id: {
        search: 'Hasil pencarian untuk {query}',
        noResult: 'Tidak ada hasil untuk {query}',
        resultTitle: 'Hasil Pencarian'
    }
  }
}
export default {
    name: 'search',
    setup () {
        useMeta(
            {
                title: 'Search Page',
                meta: [
                    { property: 'og:title', content: 'Search Page' },
                    { property: 'og:description', content: `search comic page` },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/search' },
                ]
            },
        )
    },
    i18n: i18Texts,
    components: {
        Grid
    },
    mounted(){
        this.searched = false
        if(!isNil(this.$route.query.query)){
            this.searchQuery = this.$route.query.query
            this.fetchResults()
        }else{
            this.searching = false
        }
    },
    data(){
        return {
            searching: true,
            searched: true,
            query: '',
            searchQuery: '',
            comics: [],
            config: {
                linkName: 'Comic',
                title: 'title',
                image: 'cover_image_url',
            }
        }
    },
    watch: {
        '$route.query': 'fetchResults',
    },
    methods: {
        async fetchResults(){
            if(this.$route.name == 'Search'){
                this.searching = true
                this.query = this.$route.query.query
                const whereQuery = searchQueryHelper(this.$route.query.query)
                const comics = await Comic.getDocumentsWithStorageResourceUrl(whereQuery, ['cover_image_url'])
                this.searching = false
                this.comics = comics
                this.searched = true
            }
        },
        async loadMore(){
            const lastRef = this.comics[this.comics.length - 1].doc
            const whereQuery = searchQueryHelper(this.$route.query.query, 'title', lastRef)
            const comics = await Comic.getDocumentsWithStorageResourceUrl(whereQuery, ['cover_image_url'])
            this.comics.push(...comics)
        },
        goSearch(){
            this.$router.push({name: 'Search', query: {query: this.searchQuery}})
        }
    }
}
</script>

<style scoped>

</style>