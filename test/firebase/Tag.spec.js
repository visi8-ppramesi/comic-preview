import Tag from '../../src/firebase/Tag'
import storeMock from '../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl } from './utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('Tag-Get-Collection', async () => {
    storeMock.resetState()
    const fields = Object.keys(Tag.fields)
    const tag = (await Tag.getDocuments()).map(v => pick(v.toJSON(), fields))
    const storeTags = processStates(Tag, storeMock.getState(['tags']))
    expect(isEqual(tag, storeTags)).toBe(true)
})

test('Tag-Update-Collection', async () => {
    storeMock.resetState()
    const tag = await Tag.getDocument('tag-1')
    tag.updateDocument({name: 'new tag name'})
    const storeTag = storeMock.getState(['tags', 'tag-1'])
    expect(storeTag.name).toEqual('new tag name')
})

test('Tag-Delete-Collection', async () => {
    storeMock.resetState()
    const tag = await Tag.getDocument('tag-1')
    tag.deleteDocument()
    const deletedTag = storeMock.getState(['tags', 'tag-1'])
    expect(deletedTag).toBe(null)
})

test('Tag-Set-Collection', async () => {
    storeMock.resetState()
    const tag = await Tag.getDocument('tag-1')
    tag.setDocument({name: 'new new tag name'})
    const storeTagNewdoc = storeMock.getState(['tags', 'tag-1'])
    expect(storeTagNewdoc.name).toEqual('new new tag name')

    const newTag = await Tag.createDocument({
        name: 'world'
    })
    const storeTagNewDoc = storeMock.getState(['tags', newTag.id])
    expect(isEmpty(storeTagNewDoc)).toBe(false)
})