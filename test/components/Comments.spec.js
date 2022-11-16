import { mount } from '@vue/test-utils'
import Comments from '../../src/components/Comments.vue'
import options from '../utils/pluginInitializer.js'

test('Comments', () => {
    const now = new Date()
    const wrapper = mount(Comments, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        propsData: {
            comments: [
                {
                    userName: 'testing',
                    commentMessage: 'testing',
                    profilePicture: 'http://www.w3.org/2000/svg',
                    postDate: {
                        toDate(){
                            return now
                        }
                    },
                }, 
                {
                    userName: 'testing',
                    commentMessage: 'testing',
                    profilePicture: 'http://www.w3.org/2000/svg',
                    postDate: {
                        toDate(){
                            return now
                        }
                    },
                }
            ]
        },
    })
    expect(wrapper.findAll('.comment-comment-message').map(v => v.text())).toEqual(expect.arrayContaining(['', '']))
})
