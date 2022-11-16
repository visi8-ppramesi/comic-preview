import { mount } from '@vue/test-utils'
import Modal from '../../src/components/Modal.vue'
import options from '../utils/pluginInitializer.js'

test('Modal', () => {
    const wrapper = mount(Modal, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        propsData: {
            modelValue: false
        },
        slots: {
            body: 'tes',
            footer: 'tes'
        }
    })

    expect(wrapper.find('#modal-value').exists()).toBe(false)
    expect(wrapper.find('#slot-body').exists()).toBe(false)
    expect(wrapper.find('#slot-footer').exists()).toBe(false)
})
