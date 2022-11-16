jest.useFakeTimers()
import { mount, flushPromises } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import storeMock from '../__mocks__/storeMock.js'
import MyAccount from '../../src/pages/MyAccount.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('MyAccount-save profile', async () => {
    const wrapper = mount(MyAccount, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const authStore = useAuthStore()
    authStore.login('', '')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const promises = [
        wrapper.find('#username').setValue('newname'),
        wrapper.find('#email').setValue('newemail@email.com'),
        wrapper.find('#full-name').setValue('newfull newname'),
    ]

    await Promise.all(promises)

    await wrapper.find('#save-profile-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('newemail@email.com')
    expect(storeMock.getState(['users', 'user-1', 'name'])).toEqual('newname')
    expect(storeMock.getState(['users', 'user-1', 'full_name'])).toEqual('newfull newname')
    expect(storeMock.getState(['users', 'user-1', 'email'])).toEqual('newemail@email.com')
})

test('MyAccount-save profile-En', async () => {
    const wrapper = mount(MyAccount, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    expect(wrapper.find('#my-account-title').text()).toBe('Profile Information')
    expect(wrapper.find('#my-account-description').text()).toBe('Update Your Account\'s Profile Information and Email Address')
    expect(wrapper.find('#my-account-profile').text()).toBe('Profile Photo')
    expect(wrapper.find('#my-account-username').text()).toBe('Username')
    expect(wrapper.find('#my-account-email').text()).toBe('Email')
    expect(wrapper.find('#my-account-fullname').text()).toBe('Fullname')
})

test('MyAccount-save profile-Id', async () => {
    const wrapper = mount(MyAccount, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    expect(wrapper.find('#my-account-title').text()).toBe('Informasi Profil')
    expect(wrapper.find('#my-account-description').text()).toBe('Perbarui Profil dan Alamat Email Akun Anda')
    expect(wrapper.find('#my-account-profile').text()).toBe('Foto Profil')
    expect(wrapper.find('#my-account-username').text()).toBe('Nama Pengguna')
    expect(wrapper.find('#my-account-email').text()).toBe('Email')
    expect(wrapper.find('#my-account-fullname').text()).toBe('Nama Lengkap')
})

test('MyAccount-save password', async () => {
    const wrapper = mount(MyAccount, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const authStore = useAuthStore()
    authStore.login('email@email.com', 'password')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const promises = [
        wrapper.find('#old-password').setValue('password'),
        wrapper.find('#new-password').setValue('password2'),
        wrapper.find('#confirm-password').setValue('password2'),
    ]

    await Promise.all(promises)

    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
    await wrapper.find('#save-password-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password2')
})
