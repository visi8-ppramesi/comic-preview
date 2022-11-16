import { flushPromises, mount } from '@vue/test-utils'
import Comment from '../../src/components/Comment.vue'
import options from '../utils/pluginInitializer.js'
import CommentCollection from '../../src/firebase/comics/Comment.js'

test('Comment', async () => {
    const now = new Date()
    const comment = await CommentCollection.getDocument(['comics', 'comic-1', 'comments'], 'comment-1')
    const wrapper = mount(Comment, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        propsData: {
            commentObject: comment,
            allowDelete: true,
            userName: 'testing',
            commentMessage: 'testing',
            profilePicture: 'http://www.w3.org/2000/svg',
            postDate: {
                toDate(){
                    return now
                }
            },
        },
    })
    const formattedDate = now.toLocaleTimeString('id-ID', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    expect(wrapper.find('.comment-user-name').text()).toBe('testing')
    expect(wrapper.find('.comment-comment-message').text()).toBe('testing')
    expect(wrapper.find('img[alt="Empty"]').attributes().src).toBe('http://www.w3.org/2000/svg')
    expect(wrapper.find('[data-test="comment-created-date"]').text()).toBe(formattedDate)

    await wrapper.find('.comment-delete-button').trigger('click')
    await flushPromises()
    await flushPromises()
})
