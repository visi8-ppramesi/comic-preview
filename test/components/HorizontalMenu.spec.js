import { mount } from '@vue/test-utils'
import HorizontalMenu from '../../src/components/HorizontalMenu.vue'
import options from '../utils/pluginInitializer.js'

test('HorizontalMenu', () => {
    const wrapper = mount(HorizontalMenu, {
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
            }
        },
    })

    const testing = ['testing', 'testing 2']

    expect(wrapper.findAll(".horizontal-menu-items").map(v => v.text())).toEqual(expect.arrayContaining(testing))
})
