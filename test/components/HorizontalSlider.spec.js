import { mount } from '@vue/test-utils'
import HorizontalSlider from '../../src/components/HorizontalSlider.vue'
import options from '../utils/pluginInitializer.js'

test('HorizontalSlider', () => {
    const wrapper = mount(HorizontalSlider, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        propsData: {
            items: [
                {title: 'testing'}, 
                {title: 'testing 2'}
            ],
            config: {
                title: 'title'
            },
        },
    })

    const testing = ['testing', 'testing 2']

    expect(wrapper.findAll(".horizontal-slider-items").map(v => v.text())).toEqual(expect.arrayContaining(testing))
})
