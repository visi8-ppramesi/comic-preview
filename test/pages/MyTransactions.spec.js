import { mount } from '@vue/test-utils'
import MyTransactions from '../../src/pages/MyTransactions.vue'
import options from '../utils/pluginInitializer.js'
import { useI18nStore } from '../../src/store/i18n.js'
import { nextTick } from 'vue'

test('MyTransactions-En', async () => {
    const wrapper = mount(MyTransactions, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('en')
    await nextTick()

    expect(wrapper.find('#my-transactions-title').text()).toBe('Your Transaction History')
    expect(wrapper.find('#my-transactions-id').text()).toBe('Id')
    expect(wrapper.find('#my-transactions-name').text()).toBe('Name')
    expect(wrapper.find('#my-transactions-description').text()).toBe('Description')
    expect(wrapper.find('#my-transactions-price').text()).toBe('Price')
    expect(wrapper.find('#my-transactions-currency').text()).toBe('Currency')
    expect(wrapper.find('#my-transactions-payment').text()).toBe('Payment')
    expect(wrapper.find('#my-transactions-transaction').text()).toBe('Transaction Time')
})

test('MyTransactions-Id', async () => {
    const wrapper = mount(MyTransactions, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const i18nStore = useI18nStore()
    i18nStore.changeLocale('id')
    await nextTick()

    expect(wrapper.find('#my-transactions-title').text()).toBe('Riwayat Transaksi Anda')
    expect(wrapper.find('#my-transactions-id').text()).toBe('Id')
    expect(wrapper.find('#my-transactions-name').text()).toBe('Nama')
    expect(wrapper.find('#my-transactions-description').text()).toBe('Deskripsi')
    expect(wrapper.find('#my-transactions-price').text()).toBe('Harga')
    expect(wrapper.find('#my-transactions-currency').text()).toBe('Mata Uang')
    expect(wrapper.find('#my-transactions-payment').text()).toBe('Tipe Pembayaran')
    expect(wrapper.find('#my-transactions-transaction').text()).toBe('Waktu Transaksi')
})
