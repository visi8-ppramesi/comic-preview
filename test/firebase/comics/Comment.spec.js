import Comment from '../../../src/firebase/comics/Comment.js'
import User from '../../../src/firebase/users/User.js'
// import { LongText, ProfilePicture } from '../../src/firebase/types/index.js'
import storeMock from '../../__mocks__/storeMock.js'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import { processStates, processStatesWithDownloadUrl, processStatesWithDataUrl, isCloseEnough } from '../utils/common.js'
import isNil from 'lodash/isNil'
import { useAuthStore } from '@/store/auth.js'

test('Comment-Delete', async () => {
    storeMock.resetState()
    const comment = await Comment.getDocument(['comics', 'comic-1', 'comments'], 'comment-1')
    await comment.deleteComment()
    const comments = storeMock.getState(['comics', 'comic-1', 'comments', 'comment-1'])
    expect(isNil(comments)).toBe(true)
})

test('Comment-Add', async () => {
    storeMock.resetState()
    const user = (await User.getDocument('user-1')).toJSON()
    const comment = 'This is a comment'
    const newComment = await Comment.addComment('comic-1', comment, user)
    const commentState = storeMock.getState(['comics', 'comic-1', 'comments', newComment[newComment.length - 1]])
    expect(commentState.message).toEqual(comment)
})

test('Comment-Get-Group-Collection', async () => {
    storeMock.resetState()
    const comments = await Comment.getDocumentsCollection()
    const ids = comments.map(v => v.id)

    expect(ids).toEqual(['comment-1', 'comment-2', 'comment-3', 'comment-4'])
})

// test('Comment-Create-Listener', async () => {
//     storeMock.resetState()
//     const callback = jest.fn()
//     const listener = Comment.createNewCommentListener('comic-1', callback)

//     const user = (await User.getDocument('user-1')).toJSON()
//     const comment = 'This is a comment'
//     await Comment.addComment('comic-1', comment, user)

//     expect(callback).toHaveBeenCalled()
//     listener()
// })