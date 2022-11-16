<template>
    <div class="max-w-xl w-full mx-auto flex text-black mb-2">
        <div class="rounded-md bg-white lg:text-md xl:text-lg flex-1 shadow-lg px-4 py-4 sm:px-6 sm:py-4 leading-relaxed drop-shadow-md">
            <div class="flex flex-row">
                <img class="flex items-center justify-center rounded-full w-12 h-12 sm:w-16 sm:h-16" :src="profilePicture" alt="Empty">
                <div class="flex flex-col w-full">
                    <div class="flex flex-row">
                        <div class="px-3 flex flex-col flex-grow items-start justify-center gap-y-1">
                            <span class="comment-user-name font-extrabold text-sm leading-3 lg:text-md xl:text-lg">{{ userName }}</span> <span data-test="comment-created-date" class="=lg:text-sm xl:text-md text-xs text-gray-900 leading-3">{{ formattedDate }}</span>
                        </div>
                        <button v-if="allowDelete" class="comment-delete-button flex items-start justify-between" @click="deleteComment">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="comment-comment-message pl-3 sm:pl-3 text-left pt-3 lg:text-md xl:text-lg">
                        {{ commentMessage }}
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="rounded-md bg-white lg:text-md xl:text-lg flex-1 shadow-lg px-4 py-4 sm:px-6 sm:py-4 leading-relaxed">
            <div class="flex">
                <img class="flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8" :src="profilePicture" alt="">
                <div class="px-3 flex flex-col flex-grow items-start justify-center gap-y-1">
                    <span class="font-extrabold text-sm lg:text-xl leading-3">{{ userName }}</span> <span class="lg:text-lg text-xs text-gray-900 leading-3">{{ formattedDate }}</span>
                </div>
                <button v-if="allowDelete" class="flex items-start justify-between" @click="deleteComment">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="pl-9 sm:pl-11 text-left pt-3">
                {{ commentMessage }}
            </div>
        </div> -->

    </div>
</template>

<script>
//test-testTest
// import moment, { isMoment } from 'moment'
export default {
    name: 'comment',
    emits: ['deleteComment'],
    props: {
        commentObject: Object,
        commentMessage: String,
        userName: String,
        postDate: {type: Object, default: () => ({toDate(){return new Date()}})},
        profilePicture: String,
        allowDelete: {
            type: Boolean,
            default: false
        }
    },
    // props: ['commentMessage', 'userName', 'postDate', 'profilePicture', 'allowDelete'],
    // inject: ['swal'],
    computed: {
        formattedDate(){
            return this.postDate.toDate().toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        }
    },
    data() {
        return {
        }
    },
    methods: {
        deleteComment(){
            this.commentObject.deleteComment().then(() => {
                this.$emit('deleteComment', this.commentObject.id)
            })
        }
    }
    // created(){
    //     this.moment = moment
    //     this.likes[this.comment.id] = this.comment.liked
    //     this.comment.all_children_with_commenter.forEach((el) => {
    //         this.likes[el.id] = el.liked
    //     })
    // },
    // methods:{
    //     likeComment(commentId, liked){
    //         let vote = true
    //         if(liked){
    //             vote = false
    //         }
    //         axios.post(route('api.comment.vote', {comment: commentId}), {
    //             vote: vote
    //         })
    //         .then((response) => {
    //             this.likes[commentId] = !liked
    //             if(this.comment.id === commentId){
    //                 this.comment.rating = response.data.rating
    //             }else{
    //                 let idx = this.comment.all_children_with_commenter.findIndex(el => el.id === commentId)
    //                 this.comment.all_children_with_commenter[idx].rating = response.data.rating
    //                 // this.comment.all_children_with_commenter[idx].liked = !vote
    //             }
    //         })
    //     },
    //     deleteComment(id){
    //         const swalWithBootstrapButtons = this.swal.mixin({
    //             customClass: {
    //                 confirmButton: 'bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    //                 cancelButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    //             },
    //             buttonsStyling: false
    //         })
    //         swalWithBootstrapButtons.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, delete it!',
    //             cancelButtonText: 'No, cancel!',
    //             reverseButtons: true
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 axios.delete(route('api.comment.delete', {comment: id}))
    //                 .then((response) => {
    //                     this.emitter.emit('reloadComments')
    //                     swalWithBootstrapButtons.fire(
    //                         'Deleted!',
    //                         'Your comment has been deleted.',
    //                         'success'
    //                     )
    //                 })
    //             } else if (
    //                 result.dismiss === Swal.DismissReason.cancel
    //             ) {
    //                 swalWithBootstrapButtons.fire(
    //                     'Cancelled',
    //                     'Your comment is safe :)',
    //                     'error'
    //                 )
    //             }
    //         })
    //     },
    //     toggleReplyBox(){
    //         this.replyBox = !this.replyBox
    //     },
    //     submit(){
    //         axios.post(route('comments.reply', {comment: this.comment.id}), {
    //             message: this.message
    //         })
    //         .then((response) => {
    //             this.message = ''
    //             this.replyBox = false
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
<style scoped>
.active{
    fill:red;
}
.inactive{
    fill:transparent;
}
</style>