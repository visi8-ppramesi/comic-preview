jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import Chapter from '../../src/pages/Chapter.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

beforeEach(() => {
    // create teleport target
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
            width: 10,
            height: 10,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }
    });
})

afterEach(() => {
    // clean up
    document.body.outerHTML = ''
})

test('Chapter-En', async () => {
    options.plugins.router.push({ name: 'Chapter', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()

    const wrapper = mount(Chapter, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: { ...options.components }
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    document.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
    jest.runAllTimers();
    document.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
    jest.runAllTimers();

    expect(wrapper.find("#chapter-content-container").exists()).toBe(true)
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(wrapper.findAll('.content').map(v => v.attributes('src'))).toEqual(expect.arrayContaining(["https://signed-url.com/stuff.jpg"]))
    expect(wrapper.findAll('.chapter-episode').map(v => v.text())).toEqual(expect.arrayContaining(['Episode 1', 'Episode 2']))
    expect(wrapper.find('#chapter').text()).toBe('Select Chapter')
    expect(wrapper.find('#chapter-prev').text()).toBe('prev')
    expect(wrapper.find('#chapter-next').text()).toBe('next')
})

test('Chapter-Id', async () => {
    options.plugins.router.push({ name: 'Chapter', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()

    const wrapper = mount(Chapter, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: { ...options.components }
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    document.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
    jest.runAllTimers();
    document.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
    jest.runAllTimers();

    expect(wrapper.find("#chapter-content-container").exists()).toBe(true)
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(wrapper.findAll('.content').map(v => v.attributes('src'))).toEqual(expect.arrayContaining(["https://signed-url.com/stuff.jpg"]))
    expect(wrapper.findAll('.chapter-episode').map(v => v.text())).toEqual(expect.arrayContaining(['Episode 1', 'Episode 2']))
    expect(wrapper.find('#chapter').text()).toBe('Pilih Chapter')
    expect(wrapper.find('#chapter-prev').text()).toBe('sebelumnya')
    expect(wrapper.find('#chapter-next').text()).toBe('selanjutnya')
})

// test('reject-test', async () => {
//     const test = async () => {
//         await Promise.reject('a')
//         return 1
//     }
//     try{
//         expect(await test()).rejects.toBe('a')
//     }catch(e){
//         expect(e).toBe('a')
//     }
//     const t = 1
//     expect(t).toBe(1)
// })

// test('Chapter-404', async () => {
//     // options.plugins.router.push({ name: 'Chapter', params: { comicId: 'comic-not-exists', chapterId: 'chapter-not-exists' } })
//     // await options.plugins.router.isReady()

//     const mockRoute = {
//         params: { 
//             comicId: 'comic-not-exists', 
//             chapterId: 'chapter-not-exists'
//         }
//     }
//     const mockRouter = {
//         push: jest.fn()
//     }
//     const wrapper = mount(Chapter, {
//         global: {
//             plugins: [...Object.values(options.plugins)],
//             components: { ...options.components },
//             mocks: {
//                 $route: mockRoute,
//                 $router: mockRouter
//             }
//         }
//     })
//     await flushPromises()
//     await flushPromises()
//     expect(mockRouter.push).toHaveBeenCalledTimes(1)
//     expect(mockRouter.push).toHaveBeenCalledWith({"name": "NotFound", "params": {}, "query": {}})
// })