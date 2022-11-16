import { mount, flushPromises } from '@vue/test-utils'
import Author from '../../src/pages/Author.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('Author-En', async () => {
    const wrapper = mount(Author, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    expect(wrapper.find("#author-social-media-title").text()).toBe('Social Media :')
    expect(wrapper.find("#author-description-title").text()).toBe('About Author :')
    expect(wrapper.find("#author-books-title").text()).toBe('Author books :')
})

test('Author-Id', async () => {
    const wrapper = mount(Author, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    expect(wrapper.find("#author-social-media-title").text()).toBe('Media Sosial :')
    expect(wrapper.find("#author-description-title").text()).toBe('Tentang Penulis :')
    expect(wrapper.find("#author-books-title").text()).toBe('Buku-buku Penulis :')
})
