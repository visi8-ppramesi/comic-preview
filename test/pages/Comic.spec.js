jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import Comic from '../../src/pages/Comic.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

beforeEach(() => {
    // create teleport target
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)
  })
  
  afterEach(() => {
    // clean up
    document.body.outerHTML = ''
  })

test('Comic-En', async () => {
    options.plugins.router.push({name: 'Comics', params: {id: 'comic-1'}})
    await options.plugins.router.isReady()
    
    const wrapper = mount(Comic, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    const authStore = useAuthStore()
    authStore.login('', '')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    // console.log('userInstance', authStore.userInstance)
    
    expect(wrapper.find('#comic-comments').text()).toBe('Add a new comment')
    expect(wrapper.find('#comic-views').text()).toBe('3 views')
    expect(wrapper.find('#comic-episode').text()).toBe('Ep. 1')
    // expect(wrapper.find('#comic-comment').text()).toBe('Comments')
    expect(wrapper.find('#title').text()).toBe('hard drive 2000')
    expect(wrapper.find('#categories').text()).toBe('Horror, Scifi')
    expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining([]))

    await wrapper.find('#favorite-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining(['comics', 'comic-1']))

    await wrapper.find('#favorite-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining([]))

    await wrapper.find('#subscribe-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(storeMock.getState(['users', 'user-1', 'comic_subscriptions'])[0]).toEqual(expect.arrayContaining(['comics', 'comic-1']))

    await wrapper.find('#subscribe-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(storeMock.getState(['users', 'user-1', 'comic_subscriptions'])[0]).toEqual(expect.arrayContaining([]))
    expect(wrapper.findAll('.buy-button')[0].exists()).toBe(true)
})

test('Comic-Id', async () => {
  options.plugins.router.push({name: 'Comics', params: {id: 'comic-1'}})
  await options.plugins.router.isReady()
  
  const wrapper = mount(Comic, {
      global: {
          plugins: [...Object.values(options.plugins)],
          components: {...options.components}
      }
  })
  const i18nStore = useI18nStore()
  i18nStore.changeLocale('id')
  await nextTick()

  const authStore = useAuthStore()
  authStore.login('', '')
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()

  // console.log('userInstance', authStore.userInstance)
  
  expect(wrapper.find('#comic-comments').text()).toBe('Tambahkan komentar')
  expect(wrapper.find('#comic-views').text()).toBe('Dilihat 3 kali')
  expect(wrapper.find('#comic-episode').text()).toBe('Ep. 1')
  expect(wrapper.find('#comic-comment').text()).toBe('Komentar')
  expect(wrapper.find('#title').text()).toBe('hard drive 2000')
  expect(wrapper.find('#categories').text()).toBe('Horror, Scifi')
  expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining([]))

  await wrapper.find('#favorite-button').trigger('click')
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()
  expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining(['comics', 'comic-1']))

  await wrapper.find('#favorite-button').trigger('click')
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()
  expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining([]))

  await wrapper.find('#subscribe-button').trigger('click')
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()
  expect(storeMock.getState(['users', 'user-1', 'comic_subscriptions'])[0]).toEqual(expect.arrayContaining(['comics', 'comic-1']))

  await wrapper.find('#subscribe-button').trigger('click')
  await flushPromises()
  await flushPromises()
  await flushPromises()
  await flushPromises()
  expect(storeMock.getState(['users', 'user-1', 'comic_subscriptions'])[0]).toEqual(expect.arrayContaining([]))
  expect(wrapper.findAll('.buy-button')[0].exists()).toBe(true)
})