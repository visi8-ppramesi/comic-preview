jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
import Authors from '../../src/pages/Authors.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('Authors-En', async () => {
    const wrapper = mount(Authors, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const titles = Object.values(storeMock.getState(['authors'])).map(item => item.name)

    expect(wrapper.findAll('.grid-item').map(item => item.text())).toEqual(expect.arrayContaining(titles))
    //['title', 'title2'] => [title, title2]
    expect(wrapper.find('#authors-sort').text()).toBe('Sort By')
    expect(wrapper.find('#author-sort-select').exists()).toBe(true)
})

test('Authors-Id', async () => {
    const wrapper = mount(Authors, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const titles = Object.values(storeMock.getState(['authors'])).map(item => item.name)

    expect(wrapper.findAll('.grid-item').map(item => item.text())).toEqual(expect.arrayContaining(titles))
    //['title', 'title2'] => [title, title2]
    expect(wrapper.find('#authors-sort').text()).toBe('Diurut berdasarkan')
    expect(wrapper.find('#author-sort-select').exists()).toBe(true)
})
