import { mount, VueWrapper } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'
import App from '../../../src/App.vue'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../../../src/store'
import { postData } from '../../mock/data'
import { actionObjects, postObjects } from '../../helpers/pageObjects'
import { Post } from '../../../src/types'

const MULTIPLE_REARRANGE_COUNT = 4
const MULTIPLE_REARRANGE_COUNT_TEXT = 'Moved post 2 from index 0 to index 1'

const getFirstPostListItem = (app: VueWrapper) => {
  return app.findAll(postObjects.root)[0]
}

const sendFirstPostItemDown = async (app: VueWrapper) => {
  const firstPostElement = getFirstPostListItem(app)
  const downButton = firstPostElement.find(postObjects.downButton)
  await downButton.trigger('click')
}

const rearrangePosts = async (app: VueWrapper) => {
  // Move posts around flipping between up and down buttons
  const array = Array.from({ length: MULTIPLE_REARRANGE_COUNT + 1 })
  for (const item of array) {
    const index = array.indexOf(item)
    let button = index % 2 === 0 ? postObjects.downButton : postObjects.upButton
    await app.findAll(postObjects.root)[index].find(button).trigger('click')
  }
}

const getCurrentPostsPropState = (app: VueWrapper) => {
  const state = app
    .findAll(postObjects.root)
    .map((postItem) => <Post>postItem.getCurrentComponent()?.props.post)
  return JSON.stringify(state)
}

const clickActionButton = async (app: VueWrapper, index: number) => {
  return await app
    .findAll(actionObjects.root)
    ?.at(index)
    ?.find(actionObjects.timeTravelButton)
    ?.trigger('click')
}

describe('App.vue', () => {
  beforeEach(() => {
    // Set up store
    setActivePinia(createPinia())
    const store = usePostsStore()
    store.posts = postData // Mock post data
  })

  it('should contain a placeholder initially', () => {
    const app = mount(App)
    expect(app.find(actionObjects.timeTravelButton).exists()).toBe(false)
    expect(app.find(actionObjects.placeholderItem).exists()).toBe(true)
  })

  it('should contain an action item after reorganizing posts', async () => {
    const app = mount(App)
    await sendFirstPostItemDown(app)
    expect(app.findAll(actionObjects.root).length).toEqual(1)
  })

  it('should contain multiple action items after reorganizing posts several times', async () => {
    const app = mount(App)
    for (const item of Array.from({ length: MULTIPLE_REARRANGE_COUNT })) {
      await sendFirstPostItemDown(app)
    }
    expect(app.findAll(actionObjects.root).length).toEqual(
      MULTIPLE_REARRANGE_COUNT
    )
    expect(app.findAll(actionObjects.root)[0].text()).toContain(
      MULTIPLE_REARRANGE_COUNT_TEXT
    )
  })

  it('should return the post list to its previous state after clicking time travel button', async () => {
    const app = mount(App)
    const initialState = getCurrentPostsPropState(app)
    await rearrangePosts(app)
    const afterRearrangeState = getCurrentPostsPropState(app)
    // Compare initial prop state vs prop state after rearranging
    expect(afterRearrangeState === initialState).toBeFalsy()
    // Click last time travel button in list
    await clickActionButton(app, -1)

    const afterTimeTravelState = getCurrentPostsPropState(app)
    // Compare initial prop state vs prop state after time travelling
    expect(afterTimeTravelState === initialState).toBe(true)
    // Actions list should be empty
    expect(app.findAll(actionObjects.root).length).toBe(0)
  })

  it('should return the post list to its previous state after clicking intermediate time travel button', async () => {
    const app = mount(App)
    await rearrangePosts(app)
    // Get current state after rearranging
    const afterRearrangeState = getCurrentPostsPropState(app)
    // Get action item from elements array by index of amount of times to rearrange
    const actionButton = await app
      .findAll(actionObjects.root)
      [MULTIPLE_REARRANGE_COUNT].find(actionObjects.timeTravelButton)

    await rearrangePosts(app)

    // Time travel to state in between two sets of rearranging posts
    await actionButton.trigger('click')
    const afterTimeTravelState = getCurrentPostsPropState(app)
    expect(afterTimeTravelState === afterRearrangeState).toBe(true)
  })
})
