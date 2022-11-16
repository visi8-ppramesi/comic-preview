jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import PaymentModal from '../../src/components/PaymentModal.vue'
import options from '../utils/pluginInitializer.js'
import { nextTick } from 'vue'
import CreditCard from '../../src/midtrans/CreditCard.js'

beforeAll(() => {
    jest.spyOn(CreditCard.prototype, 'getCardToken').mockImplementation(() => {
        return Promise.resolve({
            status_code: '200',
            status_message: 'test-wegood',
            token_id: '12412412',
            hash: 'ab1234cdef56456abc'
        })
    });
});

async function goTest(itemType, paymentType){
    const wrapper = mount(PaymentModal, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: { ...options.components },
            directives: {
                loading: (el, binding) => {
                    if (binding.value || typeof binding.value === "undefined") {
                        el.classList.add("state-loading");
                        el.setAttribute("disabled", "disabled");
                    } else {
                        el.classList.remove("state-loading");
                        el.removeAttribute("disabled");
                    }
                }
            }
        }
    })

    storeMock.resetState()
    const initOrder = storeMock.getState(['users', 'user-1', 'orders'])
    expect(initOrder).toBe(null)
    
    const authStore = useAuthStore()
    authStore.login('', '')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const comic = storeMock.getState(['comics', 'comic-1'])
    const chapter = storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1'])

    if(itemType == 'comic'){
        wrapper.vm.setState('chapterData', 'all')
        wrapper.vm.setState('comicData', comic)
    }else if(itemType == 'chapter'){
        wrapper.vm.setState('chapterData', chapter)
        wrapper.vm.setState('comicData', comic)
    }
    wrapper.vm.openModal()

    await flushPromises()
    await flushPromises()
    await nextTick()
    await nextTick()

    let selectElement
    if(paymentType == 'gopay'){
        selectElement = wrapper.find("#gopay-selector")
    }else if(paymentType == 'credit card'){
        selectElement = wrapper.find("#creditcard-selector")
    }

    await flushPromises()
    await flushPromises()
    await nextTick()
    await nextTick()

    selectElement.element.checked = true
    await Promise.all([
        selectElement.trigger('click'),
        selectElement.trigger('change')
    ])
    await nextTick()
    await nextTick()
    await nextTick()
    await nextTick()

    await wrapper.find('#next-button-top').trigger('click')
    await nextTick()
    await nextTick()
    await nextTick()
    await nextTick()

    await flushPromises()
    await flushPromises()

    await flushPromises()
    await flushPromises()

    await flushPromises()
    await flushPromises()

    console.log(wrapper.find('#comic-title').text())

    expect(wrapper.find('#comic-title').text()).toEqual(comic.title)
    if(itemType == 'comic'){
        expect(wrapper.find('#item-price').text()).toEqual('Rp. ' + comic.price)
    }else if(itemType == 'chapter'){
        expect(wrapper.find('#item-price').text()).toEqual('Rp. ' + chapter.price)
    }

    await wrapper.find(".next-step-button").trigger('click')
    await nextTick()
    await nextTick()
    await nextTick()
    await nextTick()

    if(paymentType == 'gopay'){
        expect(wrapper.find('#qr-code-img').attributes('src')).toEqual('https://google.com')
        await wrapper.find(".next-step-button").trigger('click')
        await nextTick()
        await nextTick()
        await nextTick()
        await nextTick()
    }else if(paymentType == 'credit card'){
        const currentYear = new Date().getFullYear()
        const promises = [
            wrapper.find('#credit-card-number').setValue('4744123412341234'),
            wrapper.find('#credit-card-name').setValue('Name Name'),
            wrapper.find('#credit-card-exp-month').setValue(1),
            wrapper.find('#credit-card-exp-year').setValue(currentYear + 2),
            wrapper.find('#credit-card-ccv').setValue(123),
        ]
    
        await Promise.all(promises)
        await wrapper.find(".next-step-button").trigger('click')
        await nextTick()
        await nextTick()
        await nextTick()
        await nextTick()
        jest.runAllTimers();
        await flushPromises()
        await flushPromises()
        await flushPromises()
        await flushPromises()
        await flushPromises()
        jest.runAllTimers();
    }

    const currentOrder = storeMock.getState(['users', 'user-1', 'orders'])
    const orderObj = Object.values(currentOrder)[0]
    expect(orderObj.status).toEqual('closed')
    // expect().toBe(null)
}

test('PaymentModal-Chapter-Gopay', async () => {
    await goTest('chapter', 'gopay')
})

test('PaymentModal-Comic-Gopay', async () => {
    await goTest('comic', 'gopay')
})

test('PaymentModal-Chapter-CC', async () => {
    await goTest('chapter', 'credit card')
})

test('PaymentModal-Comic-CC', async () => {
    await goTest('comic', 'credit card')
})