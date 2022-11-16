jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
// import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import Login from '../../src/pages/Login.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('Login-En', async () => {
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = mount(Login, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}

        },
        mocks: {
            $router: mockRouter
        }
    })
    const promises = [
        wrapper.find('input[name="email"]').setValue('email@email.com'),
        wrapper.find('input[name="password"]').setValue('password')
    ]
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    await Promise.all(promises)

    await wrapper.find('#login-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('email@email.com')
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
    
    expect(wrapper.find('#login-forgot').text()).toBe('Forgot Password?')
    expect(wrapper.find('#login-wrong').exists()).toBe(false)
    expect(wrapper.find('#login-account').text()).toBe('Dont have an account yet? Sign Up')
    expect(wrapper.find('#login-signup').text()).toBe('Sign Up')
    expect(wrapper.find('#login-option').text()).toBe('Or Login With')
})

test('Login-Id', async () => {
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = mount(Login, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}

        },
        mocks: {
            $router: mockRouter
        }
    })
    const promises = [
        wrapper.find('input[name="email"]').setValue('email@email.com'),
        wrapper.find('input[name="password"]').setValue('password')
    ]
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    await Promise.all(promises)

    await wrapper.find('#login-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('email@email.com')
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
    
    expect(wrapper.find('#login-forgot').text()).toBe('Lupa Password?')
    expect(wrapper.find('#login-wrong').exists()).toBe(false)
    expect(wrapper.find('#login-account').text()).toBe('Belum punya akun? Daftar')
    expect(wrapper.find('#login-signup').text()).toBe('Daftar')
    expect(wrapper.find('#login-option').text()).toBe('Atau Masuk Dengan')
})

