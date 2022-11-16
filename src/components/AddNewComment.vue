<template>
    <div class="pt-5 px-5">
        <div class="flex mx-auto items-center justify-center shadow-lg">
            <form @submit.prevent="submit" class="w-full bg-white px-4 pt-2 rounded-xl">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg lg:text-xl xl:text-2xl">{{ $t("addComment") }}</h2>
                    <div class="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea v-model="message" class="lg:text-xl xl:text-2xl text-black bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
                    </div>
                    <div class="w-full md:w-full flex items-start md:w-full px-3">
                        <div class="-mr-1">
                            <input type='submit' class="lg:text-xl xl:text-2xl bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const i18Texts = {
  messages: {
    en: {
      addComment: 'Add a new comment'
    },
    id: {
      addComment: 'Tambah komen baru'
    }
  }
}

export default {
    name: 'add-new-comment',
    props: ['commentKey'],
    i18n: i18Texts,
    data(){
        return {
            message: '',
        }
    },
    // methods:{
    //     submit(){
    //         axios.post(route('comments.store'), {
    //             commentable_encrypted_key: this.commentKey,
    //             message: this.message
    //         })
    //         .then((response) => {
    //             this.message = ''
    //             this.emitter.emit('reloadComments')
    //             return this.swal.fire({
    //                 icon: "success",
    //                 title: "Comment posted!",
    //                 text: "Comment posted succesful!",
    //             })
    //         })
    //     }
    // }
}
</script>