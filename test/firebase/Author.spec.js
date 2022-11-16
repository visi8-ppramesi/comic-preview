import Author from '../../src/firebase/Author'
// import { LongText, ProfilePicture } from '../../src/firebase/types/index.js'
import storeMock from '../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl } from './utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('Author-Get-Collection', async () => {
    storeMock.resetState()
    const fields = Object.keys(Author.fields)
    const authors = (await Author.getDocuments()).map(v => pick(v.toJSON(), fields))
    const storeAuthors = processStates(Author, storeMock.getState(['authors']))
    expect(isEqual(authors, storeAuthors)).toBe(true)

    const authorsWithDownloadUrl = (await Author.getDocumentsWithStorageResourceUrl([], ['profile_picture_url'])).map(v => pick(v.toJSON(), fields))
    const storeAuthorsWithDownloadUrl = processStatesWithDownloadUrl(Author, storeMock.getState(['authors']), ['profile_picture_url'])
    expect(isEqual(authorsWithDownloadUrl, storeAuthorsWithDownloadUrl)).toBe(true)

    const authorsWithDataUrl = (await Author.getDocumentsWithStorageResource([], ['profile_picture_url'])).map(v => pick(v.toJSON(), fields))
    const storeAuthorsWithDataUrl = processStatesWithDataUrl(Author, storeMock.getState(['authors']), ['profile_picture_url'])
    expect(isEqual(authorsWithDataUrl, storeAuthorsWithDataUrl)).toBe(true)
})

test('Author-Update-Collection', async () => {
    storeMock.resetState()
    const author = await Author.getDocument('author-1')
    author.updateDocument({name: 'new author name'})
    const storeAuthor = storeMock.getState(['authors', 'author-1'])
    expect(storeAuthor.name).toEqual('new author name')
})

test('Author-Delete-Collection', async () => {
    storeMock.resetState()
    const author = await Author.getDocument('author-1')
    author.deleteDocument()
    const deletedAuthor = storeMock.getState(['authors', 'author-1'])
    expect(deletedAuthor).toBe(null)
})

test('Author-Set-Collection', async () => {
    storeMock.resetState()
    const author = await Author.getDocument('author-1')
    author.setDocument({name: 'new new author name'})
    const storeAuthorSetDoc = storeMock.getState(['authors', 'author-1'])
    expect(storeAuthorSetDoc.name).toEqual('new new author name')

    const newAuthor = await Author.createDocument({
        description: 'description',
        social_media_links: { facebook: 'https://facebook.com', twitter: 'https://twitter.com' },
        email: 'email@mail.com',
        name: 'Name Name',
        user_id: 'user-1',
        profile_picture_url: 'gs://comics-77200.appspot.com/uploads/profile_images/hslN0mmWdxUFuAn3R4xd8gvlgLk2/newnewnew.jpg'
    })
    const storeAuthorNewDoc = storeMock.getState(['authors', newAuthor.id])
    expect(isEmpty(storeAuthorNewDoc)).toBe(false)
})