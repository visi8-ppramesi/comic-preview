jest.useFakeTimers()
import { mount, flushPromises } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import MyNotifications from '../../src/pages/MyNotifications.vue'
import options from '../utils/pluginInitializer.js'

test('MyNotifications', async () => {
    const wrapper = mount(MyNotifications, {
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

    const notifications = Object.values(storeMock.getState(['notifications', 'user-1', 'comics']))
    const titles = notifications.map(notif => {
        const cpt = storeMock.getState(notif.chapter.path.split('/'))
        const cmc = storeMock.getState(notif.comic.path.split('/'))

        return `Comic Update: ${ cmc.title } Chapter ${ cpt.chapter_number }`
    })
    expect(wrapper.findAll('.notif-title').map(item => item.text())).toEqual(expect.arrayContaining(titles))
    // console.log(storeMock.getState(['notifications', 'user-1', 'comics', 'notification-1']))
    // console.log(storeMock.getState(['notifications', 'user-1', 'comics', 'notification-2']))
    expect(storeMock.getState(['notifications', 'user-1', 'comics', 'notification-1']).unread).toBe(false)
    expect(storeMock.getState(['notifications', 'user-1', 'comics', 'notification-2']).unread).toBe(false)
})
