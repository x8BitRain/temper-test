import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
import PostList from '../../../src/components/posts/PostList.vue'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../../../src/store'
import { postData } from '../../mock/data'
import { postObjects } from '../../helpers/pageObjects'

const DOWN_BUTTON_COUNT = 4
const UP_BUTTON_COUNT = 4

describe('PostList.vue', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    const store = usePostsStore()
    store.posts = postData // Mock post data
  })
  it('should render the correct amount of up/down buttons', async () => {
    const postList = await mount(PostList)
    const visibleUpButtons = postList
      .findAll(postObjects.upButton)
      .map((btn) => btn.isVisible())
    const visibleDownButtons = postList
      .findAll(postObjects.downButton)
      .map((btn) => btn.isVisible())

    expect(visibleUpButtons.length).toEqual(UP_BUTTON_COUNT)
    expect(visibleDownButtons.length).toEqual(DOWN_BUTTON_COUNT)
  })

  it('should change the order of posts when clicking DOWN button', async () => {
    const postList = await mount(PostList)
    let firstPostElement = postList.findAll(postObjects.root)[0]
    const firstPostTitle = postData[0].title
    const secondPostTitle = postData[1].title
    const downButton = firstPostElement.find(postObjects.downButton)

    expect(firstPostElement.exists()).toBe(true)
    expect(firstPostElement.text()).toContain(firstPostTitle)
    expect(downButton.exists()).toBe(true)

    await downButton.trigger('click')
    // Get first post again after clicking down button
    firstPostElement = postList.findAll(postObjects.root)[0]
    expect(firstPostElement.text()).toContain(secondPostTitle)
  })

  it('should change the order of posts when clicking UP button', async () => {
    // First element should contain title of second element after clicking UP button
    const postList = await mount(PostList)
    let secondPostElement = postList.findAll(postObjects.root)[1]
    const secondPostTitle = postData[1].title
    const upButton = secondPostElement.find(postObjects.upButton)

    expect(secondPostElement.exists()).toBe(true)
    expect(secondPostElement.text()).toContain(secondPostTitle)
    expect(upButton.exists()).toBe(true)

    await upButton.trigger('click')
    // Get first post again after clicking up button
    const firstPostElement = postList.findAll(postObjects.root)[0]
    expect(firstPostElement.text()).toContain(secondPostTitle)
  })
})
