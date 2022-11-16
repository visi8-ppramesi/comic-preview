import Comic from '../../../src/firebase/comics/Comic.js'
import Chapter from '../../../src/firebase/comics/Chapter.js'
import Comment from '../../../src/firebase/comics/Comment.js'
// import { LongText, ProfilePicture } from '../../src/firebase/types/index.js'
import storeMock from '../../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl, isCloseEnough } from '../utils/common.js'
import isEmpty from 'lodash/isEmpty'

test('Chapter-Increment-View', async () => {
    const comic = await Chapter.getDocument(['comics', 'comic-1', 'chapters'], 'chapter-1')
    await Promise.all([
        comic.viewChapter(),
        comic.viewChapter(),
        comic.viewChapter(),
        comic.viewChapter(),
        comic.viewChapter()
    ])
    const counters = storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'counters'])
    const viewCount = Object.values(counters).reduce((acc, v) => acc += v.view_count, 0)
    expect(viewCount).toEqual(5)
})