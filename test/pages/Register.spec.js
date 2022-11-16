jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
// import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import Register from '../../src/pages/Register.vue'
import options from '../utils/pluginInitializer.js'

test('Register', async () => {
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = mount(Register, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components},
            mocks: {
                $router: mockRouter
            }
        }
    })
    const promises = [
        wrapper.find('input[name="username"]').setValue('testestest'),
        wrapper.find('input[name="email"]').setValue('email@email.com'),
        wrapper.find('input[name="full_name"]').setValue('full name'),
        wrapper.find('input[name="password"]').setValue('password')
    ]

    await Promise.all(promises)

    await wrapper.find('#register-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('email@email.com')
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
    expect(storeMock.getState(['users', 'user-new', 'name'])).toEqual('testestest')
    
    expect(wrapper.find('#register-failed').exists()).toBe(false)
    // expect(wrapper.find('#register-button').exists()).toBe(true)
    expect(wrapper.find('#register-goback').exists()).toBe(true)
})
