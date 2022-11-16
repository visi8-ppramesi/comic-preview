jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
// import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import { getDocs } from '../__mocks__/firestoreMock.js'
import { getDownloadURL } from '../__mocks__/storageMock.js'
import Search from '../../src/pages/Search.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('Search-En', async () => {
    // const mockRouter = {
    //     push: jest.fn()
    // }
    const wrapper = mount(Search, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        // mocks: {
        //     $router: mockRouter
        // }
    })
    const promises = [
        wrapper.find('input[name="search"]').setValue('testestest')
    ]

    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    await Promise.all(promises)

    await wrapper.find('#search-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('#search-query-title').text()).toBe('Search results for testestest')
    expect(wrapper.find('#search-query-not-found').exists()).toBe(false)
    expect(wrapper.find('#search-result-title').text()).toBe('Comic Search Result')

    expect(getDocs).toHaveBeenCalled()
    expect(getDownloadURL).toHaveBeenCalled()
})

test('Search-Id', async () => {
    // const mockRouter = {
    //     push: jest.fn()
    // }
    const wrapper = mount(Search, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        // mocks: {
        //     $router: mockRouter
        // }
    })
    const promises = [
        wrapper.find('input[name="search"]').setValue('testestest')
    ]

    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    await Promise.all(promises)

    await wrapper.find('#search-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('#search-query-title').text()).toBe('Hasil pencarian untuk testestest')
    expect(wrapper.find('#search-query-not-found').exists()).toBe(false)
    expect(wrapper.find('#search-result-title').text()).toBe('Hasil Pencarian')

    expect(getDocs).toHaveBeenCalled()
    expect(getDownloadURL).toHaveBeenCalled()
})

