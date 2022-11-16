import { mount } from '@vue/test-utils'
import Grid from '../../src/components/Grid.vue'
import options from '../utils/pluginInitializer.js'

test('Grid', () => {
    const wrapper = mount(Grid, {
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

    expect(wrapper.findAll(".grid-item-container").map(v => v.text())).toEqual(expect.arrayContaining(testing))
})
