jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import Comics from '../../src/pages/Comics.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('Comics-En', async () => {
    const wrapper = mount(Comics, {
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

    const titles = Object.values(storeMock.getState(['comics'])).map(item => item.title)

    expect(wrapper.findAll('.grid-item').map(item => item.text())).toEqual(expect.arrayContaining(titles))
    expect(wrapper.find('#comics-sort').text()).toBe('Sort By')
    expect(wrapper.find('#comics-select').exists()).toBe(true)
})

test('Comics-Id', async () => {
    const wrapper = mount(Comics, {
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

    const titles = Object.values(storeMock.getState(['comics'])).map(item => item.title)

    expect(wrapper.findAll('.grid-item').map(item => item.text())).toEqual(expect.arrayContaining(titles))
    expect(wrapper.find('#comics-sort').text()).toBe('Diurut berdasarkan')
    expect(wrapper.find('#comics-select').exists()).toBe(true)
})