import { defineStore } from 'pinia'
import { MoveDirections, Post, PostsStore } from '../types'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

export const usePostsStore = defineStore('posts', {
  state: () =>
    ({
      posts: [],
      history: [],
      error: null,
    } as PostsStore),
  actions: {
    async getPosts() {
      try {
        const request = await fetch(POSTS_URL)
        this.posts = await request.json()
      } catch (error: any | Error) {
        this.handleError(error)
      }
    },
    timeTravel(selectedIndex: number) {
      // Sets the posts state to a saved history snapshot by index
      // and removes history items before the selected one
      this.posts = this.history[selectedIndex].historySnapshot
      this.history = this.history.slice(selectedIndex + 1)
    },
    addHistoryItem(
      currentIndex: number,
      newIndex: number,
      post: Post,
      historySnapshot: Post[]
    ) {
      // Appends a history item object to the history state with string description
      const historyItem = {
        description: `Moved post ${post.id} from index ${currentIndex} to index ${newIndex}`,
        historySnapshot,
      }
      this.history?.unshift(historyItem)
    },
    movePost(direction: MoveDirections, currentIndex: number) {
      // Clones the current post state and moves the current post by index forward or backward
      // in the posts state depending on direction then constructs a history item with addHistoryItem()
      const currentHistory = [...this.posts]
      const currentPost = this.posts?.splice(currentIndex, 1)[0]
      const newIndex =
        direction === MoveDirections.UP ? currentIndex - 1 : currentIndex + 1
      this.posts?.splice(newIndex, 0, currentPost)
      this.addHistoryItem(currentIndex, newIndex, currentPost, currentHistory)
    },
    handleError(error: string) {
      this.error = error?.toString()
      throw new Error(<string>error)
    },
  },
})
