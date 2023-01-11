import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
import App from '../../../src/App.vue'
import PostList from '../../../src/components/posts/PostList.vue'
import ActionList from '../../../src/components/actions/ActionList.vue'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../../../src/store'
import { postData, historyData } from '../../mock/data'
import { actionObjects, postObjects } from '../../helpers/pageObjects'

const POST_COUNT = 5
const ACTION_COUNT = 3

describe('App.vue', () => {
  beforeEach(() => {
    // Set up store
    setActivePinia(createPinia())
  })
  it('should render', () => {
    const app = mount(App)
    expect(app.text()).toContain('Sortable Post List')
    expect(app.text()).toContain('List of actions committed')
    expect(app.text()).toContain('No actions yet...')
    expect(app.html()).toMatchSnapshot()
  })
})

describe('PostList.vue', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    const store = usePostsStore()
    store.posts = postData // Mock post data
  })
  it('should render a list', () => {
    const postList = mount(PostList)
    expect(postList.find(postObjects.root).exists()).toBe(true)
    expect(postList.findAll(postObjects.root).length).toEqual(POST_COUNT)
  })
})

describe('ActionList.vue', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    const store = usePostsStore()
    store.history = historyData // Mock history data
  })
  it('should render a list', () => {
    const postList = mount(ActionList)
    expect(postList.find(actionObjects.root).exists()).toBe(true)
    expect(postList.findAll(actionObjects.root).length).toEqual(ACTION_COUNT)
  })
})
