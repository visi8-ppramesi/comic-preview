import Comic from '../../../src/firebase/comics/Comic.js'
import Chapter from '../../../src/firebase/comics/Chapter.js'
import Comment from '../../../src/firebase/comics/Comment.js'
// import { LongText, ProfilePicture } from '../../src/firebase/types/index.js'
import storeMock from '../../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl, isCloseEnough } from '../utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('Comic-Increment-View', async () => {
    const comic = await Comic.getDocument('comic-1')
    await Promise.all([
        comic.viewComic(),
        comic.viewComic(),
        comic.viewComic(),
        comic.viewComic(),
        comic.viewComic()
    ])
    const counters = storeMock.getState(['comics', 'comic-1', 'counters'])
    const viewCount = Object.values(counters).reduce((acc, v) => acc += v.view_count, 0)
    expect(viewCount).toEqual(5)
})

test('Comic-Get-Chapters', async () => {
    storeMock.resetState()
    const fields = Object.keys(Chapter.fields)
    const comic = await Comic.getDocument('comic-1')
    const chapters = (await comic.getChapters()).map(v => pick(v.toJSON(), fields))
    const storeChapters = processStates(Chapter, storeMock.getState(['comics', 'comic-1', 'chapters']))
    const closeEnough = isCloseEnough(chapters, storeChapters, 0.05)
    expect(closeEnough.closeEnough).toBe(true)
})

test('Comic-Get-Comments', async () => {
    storeMock.resetState()
    const fields = Object.keys(Comment.fields)
    const comic = await Comic.getDocument('comic-1')
    const comments = (await comic.getComments()).map(v => pick(v.toJSON(), fields))
    const storeComments = processStates(Comment, storeMock.getState(['comics', 'comic-1', 'comments']))
    const closeEnough = isCloseEnough(comments, storeComments, 0.05)
    expect(closeEnough.closeEnough).toBe(true)
})