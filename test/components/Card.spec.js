import { mount } from '@vue/test-utils'
import Card from '../../src/components/Card.vue'
import options from '../utils/pluginInitializer.js'

test('Card', () => {
    const wrapper = mount(Card, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'card testing'
        }
    })
    expect(wrapper.find('#card-slot').text()).toContain('card testing')
})
