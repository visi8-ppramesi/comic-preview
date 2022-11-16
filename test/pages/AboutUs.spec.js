import { mount } from '@vue/test-utils'
import AboutUs from '../../src/pages/AboutUs.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('About-En', async () => {
    const wrapper = mount(AboutUs, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    expect(wrapper.find('#about-us-title').text()).toBe('About Visi8')
    expect(wrapper.find('#about-us-description').text()).toBe('it’s 3D Animated movie, about a young guardian of the magical realms, who is curious yet skeptical toward humans, must cooperate with two mysterious human time explorers in order to find the source of anomalies, before the destructions spreads too far. The project itself will develop it’s IP, through movies, games, AR & VR Experience, as well as merchandising and licensing for both national and international market. This project is currently still being produced by our in-house production.')
    expect(wrapper.find('#about-us-title2').text()).toBe('WHAT WE DO')
    expect(wrapper.find('#about-us-services-design').text()).toBe('AR and 3D Design')
    expect(wrapper.find('#about-us-services-web').text()).toBe('Web and Apps')
    expect(wrapper.find('#about-us-services-animation').text()).toBe('Animation Movie')
})

test('About-Id', async () => {
    const wrapper = mount(AboutUs, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    expect(wrapper.find('#about-us-title').text()).toBe('Tentang Visi8')
    expect(wrapper.find('#about-us-description').text()).toBe('Kara merupakan film animasi 3d, bercerita tentang seorang penjaga yang berasal dari alam yang magis, yang penasaran namun juga memiliki keraguan terhadap manusia. Kara harus bekerja sama dengan dua manusia penjelajah waktu yang misterius untuk menemukan sumber anomali sebelum kehancuran menyebar terlalu jauh. Project kara tersebut akan dikembangkan melalui animasi, permainan, pengalaman AR dan VR, serta akan mengambil pasar nasional dan internasional. Projek ini saat ini masih diproduksi di rumah produksi kami.')
    expect(wrapper.find('#about-us-title2').text()).toBe('Apa yang Kita Lakukan')
    expect(wrapper.find('#about-us-services-design').text()).toBe('Desain AR dan 3D')
    expect(wrapper.find('#about-us-services-web').text()).toBe('Web dan Aplikasi')
    expect(wrapper.find('#about-us-services-animation').text()).toBe('Animasi Movie')
})
