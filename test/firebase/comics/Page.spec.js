import Page from '../../../src/firebase/comics/Page.js'
import User from '../../../src/firebase/users/User.js'
import storeMock from '../../__mocks__/storeMock.js'

test('Page-Get-Collection', async () => {
    storeMock.resetState()
    const pages = (await Page.getDocumentsCollection()).map(v => v.id)

    const comics = storeMock.getState(['comics'])
    const pgIds = Object.values(comics).reduce((acc, v) => {
        const keys = Object.values(v.chapters).reduce((innerAcc, innerV) => {
            innerAcc.push(...new Set([...Object.keys(innerV.pages)]))
            return innerAcc
        }, [])
        acc.push(...new Set([...keys]))
        return acc
    }, [])
    expect(pages).toEqual(pgIds)
})
