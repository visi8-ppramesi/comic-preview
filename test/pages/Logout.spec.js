import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore, signOut } from '../__mocks__/authMock.js'
import Logout from '../../src/pages/Logout.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('Logout', async () => {
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = mount(Logout, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components},
            mocks: {
                $router: mockRouter
            }
        }
    })

    const authStore = useAuthStore()
    authStore.login('test@test.com', 'passwordasdfasdf')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(signOut).toHaveBeenCalledTimes(1)
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Login' })
})