import Category from '../../src/firebase/Category'
import storeMock from '../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl } from './utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('Category-Get-Collection', async () => {
    storeMock.resetState()
    const fields = Object.keys(Category.fields)
    const category = (await Category.getDocuments()).map(v => pick(v.toJSON(), fields))
    const storeCategories = processStates(Category, storeMock.getState(['categories']))
    expect(isEqual(category, storeCategories)).toBe(true)
})

test('Category-Update-Collection', async () => {
    storeMock.resetState()
    const category = await Category.getDocument('category-1')
    category.updateDocument({name: 'new category name'})
    const storeCategory = storeMock.getState(['categories', 'category-1'])
    expect(storeCategory.name).toEqual('new category name')
})

test('Category-Delete-Collection', async () => {
    storeMock.resetState()
    const category = await Category.getDocument('category-1')
    category.deleteDocument()
    const deletedCategory = storeMock.getState(['categories', 'category-1'])
    expect(deletedCategory).toBe(null)
})

test('Category-Set-Collection', async () => {
    storeMock.resetState()
    const category = await Category.getDocument('category-1')
    category.setDocument({name: 'new new category name'})
    const storeCategoryNewdoc = storeMock.getState(['categories', 'category-1'])
    expect(storeCategoryNewdoc.name).toEqual('new new category name')

    const newCategory = await Category.createDocument({
        name: 'Scifi'
    })
    const storeCategoryNewDoc = storeMock.getState(['categories', newCategory.id])
    expect(isEmpty(storeCategoryNewDoc)).toBe(false)
})