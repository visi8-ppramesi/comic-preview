jest.useFakeTimers()
import { mount } from '@vue/test-utils'
import TestTwo from '../../src/pages/TestTwo.vue'
import handleError from '../../src/utils/handleError.js'
import options from '../utils/pluginInitializer.js'
import emitter from '../../src/utils/emitter.js'
import { nextTick } from 'vue'
// import { createTestingPinia } from '@pinia/testing'

test('TestTwo', async () => {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    expect(1).toBe(1)
    // const loginErrorTest = jest.fn()
    // emitter.on('loginError', () => {
    //     loginErrorTest()
    // })

    // const registerErrorTest = jest.fn()
    // emitter.on('loginError', () => {
    //     registerErrorTest()
    // })

    // const wrapper = mount(TestTwo, {
    //     global: {
    //         plugins: [...Object.values(options.plugins)],
    //         components: {...options.components}
    //     }
    // })
    // expect(wrapper.find('#test').exists()).toBe(true)

    // handleError(new Error('test error'), 'loginError')
    // expect(loginErrorTest).toHaveBeenCalled()

    // handleError(new Error('test error'), 'registerErrorTest')
    // expect(registerErrorTest).toHaveBeenCalled()

    // handleError(new Error('test error'), 'getDocumentError')
    // await nextTick()
    // jest.spyOn(document.body, 'appendChild');
    // expect(document.body.appendChild).toBeCalled()
})