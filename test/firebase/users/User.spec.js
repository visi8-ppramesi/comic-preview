import User from '../../../src/firebase/users/User.js'
import Order from '../../../src/firebase/users/Order.js'
import storeMock from '../../__mocks__/storeMock.js'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl, isCloseEnough } from '../utils/common.js'
import { v4 } from 'uuid'
import isEqual from 'lodash/isEqual'

test('User-Orders', async () => {
    const orders = {}
    for(let i = 0; i < 10; i++) {
        const uuid = v4()
        const param = {
            uuid,
            status: 'pending',
            created_at: new Date(),
            updated_at: new Date(),
            order_items: [
                {
                    uuid: v4(),
                    comic_id: 'comic-' + i,
                    chapter_id: 'chapter-1',
                    price: 100,
                    quantity: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            ]
        }
        storeMock.setState(['users', 'user-1', 'orders', uuid], param)
        orders[uuid] = param
    }

    const user = await User.getDocument('user-1')
    const userOrders = await user.getOrders()
    expect(userOrders.length).toEqual(Object.values(orders).length)
})

test('User-get-purchased-comics', async () => {
    storeMock.resetState()
    const setPurchasedComic = {
        'comic-1': {
            chapters: [
                ['comic-1', 'chapters', 'chapter-1'],
                ['comic-1', 'chapters', 'chapter-2']
            ]
        }
    }
    storeMock.setState(['users', 'user-1', 'purchased_comics'], {
        ...setPurchasedComic
    })

    const user = await User.getDocument('user-1')
    const purchasedComics = await user.getPurchasedComics()
    const processedPurchases = Object.keys(setPurchasedComic).reduce((acc, key) => {
        const k = setPurchasedComic[key]
        acc[key] = k['chapters']
        return acc
    }, {})
    
    expect(isEqual(purchasedComics, processedPurchases)).toBe(true)
})

test('User-get-roles', async () => {
    storeMock.resetState()
    const user = await User.getDocument('user-1')
    const roles = await user.getRoles()
    expect(roles).toEqual(['user'])
})

test('User-bestow-comic', async () => {
    storeMock.resetState()
    const user = await User.getDocument('user-1')
    await user.bestowComic('comic-1', ['chapter-1', 'chapter-2'])
    const purchasedComics = await user.getPurchasedComics()
    const purchasedCheck = isEqual(
        purchasedComics['comic-1'].map((v) => [v[0], v[1], v[2], v[3]]),
        [
            [ 'comics', 'comic-1', 'chapters', 'chapter-1' ],
            [ 'comics', 'comic-1', 'chapters', 'chapter-2' ]
        ]
    )
    expect(purchasedCheck).toEqual(true)
})

test('User-Sub-Unsub', async () => {
    storeMock.resetState()
    const user = await User.getDocument('user-1')
    await user.subscribeComic('comic-1')
    const subs = storeMock.getState(['users', 'user-1', 'comic_subscriptions']).map(v => [v[0], v[1]])
    expect(isEqual(subs, [ [ 'comics', 'comic-1' ] ])).toEqual(true)

    await user.unsubscribeComic('comic-1')
    const unsub = storeMock.getState(['users', 'user-1', 'comic_subscriptions'])
    expect(isEqual(unsub, [])).toEqual(true)
})