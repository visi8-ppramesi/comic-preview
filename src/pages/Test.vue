<template>
    <div class="text-white w-screen h-screen text-center" v-if="canRunAr">
        Can Run AR
    </div>
    <div class="text-white w-screen h-screen text-center" v-else>
        Cannot Run AR
    </div>
    <button @click="stuff">ppp</button>
    <component v-if="shit" :is="shit"></component>
</template>

<script>
import axios from 'axios'
export default {
    inject: ['canRunAr'],
    data(){
        return {
            shit: null,
            renderer: '',
            test: {
                name: 'test',
                data: '()=>({bbb:""})',
                methods: '({stuff(){this.bbb=imageManifest["img/instagram.png"];this.$router.push({name: "Dashboard"})}})',
                template: '<img :src="bbb" /><div class="text-white w-screen h-screen text-center" v-if="canRunAr">Can Run AR</div><div class="text-white w-screen h-screen text-center" v-else>Cannot Run AR</div><button @click="stuff">ppp</button>'
            }
        }
    },
    created(){
        window.axios = axios
    },
    methods: {
        stuff(){
            const ppp = this.asyncComponentLoader(() => Promise.resolve(this.test))
            this.shit = ppp
        }
    }
}
</script>