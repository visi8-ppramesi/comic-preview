import { mount } from '@vue/test-utils'
import MyComics from '../../src/pages/MyComics.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('MyComics-En', async () => {
    const wrapper = mount(MyComics, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    expect(wrapper.find('#my-comics-title').text()).toBe('Your Purchased Comics')
    expect(wrapper.find({ ref: 'chapter' }).exists())
    expect(wrapper.find({ ref: 'load' }).exists())
})

test('MyComics-Id', async () => {
    const wrapper = mount(MyComics, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    expect(wrapper.find('#my-comics-title').text()).toBe('Comic yang Anda Beli')
    expect(wrapper.find({ ref: 'chapter' }).exists())
    expect(wrapper.find({ ref: 'load' }).exists())
})
