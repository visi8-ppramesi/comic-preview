<template>
    <div class="h-full w-full">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1 text-white">
                <div id="my-account-title" class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">{{ $t("title") }}</div>
                <div id="my-account-description" class="px-3 lg:px-5">{{ $t("accDescription") }}</div>
            </div>
            <div class="md:col-span-2">
                <div class="p-3">
                    <div class="bg-slate-100 rounded border-2">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-4">
                                <div id="my-account-profile" class="text-xl p-3 lg:p-5">{{ $t("profile") }}</div>
                                <div class="px-3">
                                    <img v-if="imageDataUrl" :src="imageDataUrl" />
                                    <input ref="profilePictureRef" type="file" accept="image/*" style="display:none"
                                        @change="onFileChange" />
                                    <button class="font-bold px-3 border-2 rounded" @click="selectProfilePicture">{{ $t("profilePicture") }}</button>
                                </div>
                            </div>
                            <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                <label id="my-account-username" class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    {{ $t("username") }}
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="text" v-model="name" placeholder="Username">
                            </div>
                            <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                <label id="my-account-email" class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                    {{ $t("email") }}
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email" type="text" v-model="email" placeholder="Email">
                            </div>
                            <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                <label id="my-account-fullname" class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                                    {{ $t("fullname") }}
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="full-name" type="text" v-model="full_name" placeholder="Fullname">
                            </div>
                        </div>
                        <div class="flex justify-end px-5 py-5">
                            <button id="save-profile-button" class="bg-blue-500 rounded w-14 h-7" @click="saveProfile">{{ $t("save") }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="authProvider == 'email'" class="md:col-span-1 text-white">
                <div id="my-account-password" class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">{{ $t("password") }}</div>
                <div id="my-account-password-description" class="px-3 lg:px-5">{{ $t("passDescription") }}</div>
            </div>
            <div v-if="authProvider == 'email'" class="md:col-span-2">
                <div class="p-3">
                    <div class="bg-slate-100 rounded border-2">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                <label id="my-account-password-current" class="block text-gray-700 text-sm font-bold mb-2" for="cureent-password">
                                    {{ $t("currentPass") }}
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="old-password" type="password" v-model="oldPassword" placeholder="Current Password">
                            </div>
                            <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                <label id="my-account-password-new" class="block text-gray-700 text-sm font-bold mb-2" for="new-password">
                                    {{ $t("newPass") }}
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="new-password" type="password" v-model="newPassword" placeholder="Password">
                            </div>
                            <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                <label id="my-account-password-confirm" class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
                                    {{ $t("confirmPass") }}
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirm-password" type="password" placeholder="Confirm password">
                            </div>
                        </div>
                        <div class="flex justify-end px-5 py-5">
                            <button id="save-password-button" class="bg-blue-500 rounded w-14 h-7" @click="savePassword">{{ $t("save") }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div v-if="authProvider != 'google'" class="md:col-span-1 text-white">
                    <div class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">Link Your Account</div>
                    <div class="px-3 lg:px-5">Link your Webcomic account with your other social media accounts</div>
                </div> -->
            <!-- <div v-if="authProvider != 'google'" class="md:col-span-2">
                    <div class="p-3">
                        <div class="bg-slate-100 rounded border-2">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="px-3 my-2 col-span-6 sm:col-span-4">
                                    <button @click="linkToGoogle" class="px-6 py-3 my-4 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-3 text-gray-900 fill-current" viewBox="0 0 48 48" width="48px" height="48px">
                                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                            <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                            <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                            <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        </svg>Link Google Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
        </div>
    </div>
</template>

<script>
/*
    todo: 
        validation
        error toast
*/
import { useAuthStore } from '../store/auth.js'
import { mapState } from 'pinia'
// import { doc } from 'firebase/firestore'
// import firebase from '../firebase/firebase.js'
// import _ from 'lodash'
import isNil from 'lodash/isNil'
import { useMeta } from 'vue-meta'

const i18Texts = {
  messages: {
    en: {
        title: 'Profile Information',
        accDescription: 'Update Your Account\'s Profile Information and Email Address',
        profile: 'Profile Photo',
        profilePicture: 'Select Profile Picture',
        username: 'Username',
        email: 'Email',
        fullname: 'Fullname',
        save: 'Save',
        password: 'Update Password',
        passDescription: 'Ensure Your Password is using a long, random password to stay secure',
        currentPass: 'Current Password',
        newPass: 'New Password',
        confirmPass: 'Confirm Password',
    },
    id: {
        title: 'Informasi Profil',
        accDescription: 'Perbarui Profil dan Alamat Email Akun Anda',
        profile: 'Foto Profil',
        profilePicture: 'Pilih Foto Profil',
        username: 'Nama Pengguna',
        email: 'Email',
        fullname: 'Nama Lengkap',
        save: 'Simpan',
        password: 'Perbarui Sandi',
        passDescription: 'Pastikan Sandi Anda menggunakan sandi yang panjang, acak, dan aman untuk menjaga keamanan',
        currentPass: 'Sandi Saat Ini',
        newPass: 'Sandi Baru',
        confirmPass: 'Konfirmasi Sandi Baru',
    }
  }
}
export default {
    name: 'my-account',
    setup () {
        useMeta(
            {
                title: 'My Account Page',
                meta: [
                    { property: 'og:title', content: 'My Account Page' },
                    { property: 'og:description', content: 'user account information' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://visi8-webcomic.net/my-account' },
                ]
            },
        )
    },
    i18n: i18Texts,
    data() {
        return {
            profilePicture: null,
            profilePictureChanged: false,
            imageDataUrl: null,
            name: '',
            email: '',
            full_name: '',
            oldPassword: '',
            newPassword: '',
            authStore: null,
            authProvider: '',
            loadingComponent: null
        }
    },
    created() {
        this.authStore = useAuthStore()
        if (!isNil(this.userData)) {
            const { name, email, full_name, authProvider } = this.userData
            this.name = name
            this.email = email
            this.full_name = full_name
            this.imageDataUrl = this.profileImageUrl
            this.authProvider = authProvider
        }
        if (!isNil(this.profileImageUrl)) {
            this.imageDataUrl = this.profileImageUrl
        }
    },
    watch: {
        profileImageUrl() {
            if (!isNil(this.profileImageUrl)) {
                this.imageDataUrl = this.profileImageUrl
            }
        },
        userData() {
            if (!isNil(this.userData)) {
                const { name, email, full_name, authProvider } = this.userData
                this.name = name
                this.email = email
                this.full_name = full_name
                this.authProvider = authProvider
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            userData: 'user',
            userInstance: 'userInstance',
            isLoggedIn: 'isLoggedIn',
            profileImageUrl: 'profile_image_url'
        })
    },
    methods: {
        async linkToGoogle() {
            try {
                await this.userInstance.linkToGoogle()
            } catch (err) {
                let message
                if (err.code == "auth/credential-already-in-use") {
                    message = 'Credential already in use'
                } else {
                    message = 'Something went wrong :('
                }
                this.$toast.open({
                    message: message,
                    type: "error",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
            }
        },
        onFileChange(event) {
            this.profilePicture = event.target.files[0];
            this.imageDataUrl = URL.createObjectURL(this.profilePicture);
            this.profilePictureChanged = true
        },
        selectProfilePicture() {
            this.$refs.profilePictureRef.click()
        },
        async saveProfile() {
            this.loadingComponent = this.$loading.show({
                loader: 'dots'
            });
            try {
                if (this.profilePictureChanged) {
                    await this.userInstance.uploadField('profile_image_url', 'profile_images/' + this.userInstance.id, this.profilePicture)
                }
                const { name, email, full_name } = this
                await this.authStore.updateUserProfileData({ name, email, full_name })
                // await this.userInstance.updateProfileData({name, email, full_name}).then((__) => {
                //     this.authStore.updateStoreUserData({ name, email, full_name })
                // })
                this.$toast.open({
                    message: "Profile updated!",
                    type: "success",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
            } catch (err) {
                console.error(err)
                throw err
            } finally {
                this.loadingComponent.hide();
                this.loadingComponent = null
            }
        },
        async savePassword() {
            this.loadingComponent = this.$loading.show({
                loader: 'dots'
            });
            try {
                await this.userInstance.updatePassword(this.oldPassword, this.newPassword)
                this.$toast.open({
                    message: "Password updated!",
                    type: "success",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
            } catch (err) {
                console.error(err)
                throw err
            } finally {
                this.loadingComponent.hide();
                this.loadingComponent = null
            }
        },
        onCancel() {
            this.logger('cancelled')
        }
    },
    beforeUnmount(){
        if(this.loadingComponent && document.getElementsByClassName('vld-container').length > 0){
            this.loadingComponent.hide()
        }
    }
}
</script>

<style scoped>
</style>