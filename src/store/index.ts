import { defineStore } from 'pinia'
import { MoveDirections, Post, PostsStore } from '../types'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

export const usePostsStore = defineStore('posts', {
  state: () =>
    ({
      posts: [],
      history: [],
    } as PostsStore),
  actions: {
    async getPosts() {
      try {
        const request = await fetch(POSTS_URL)
        this.posts = await request.json()
      } catch (error) {
        throw new Error(<string>error)
      }
    },
    timeTravel(selectedIndex: number) {
      this.posts = this.history[selectedIndex].historySnapshot
      this.history = this.history.slice(selectedIndex + 1)
    },
    addHistoryItem(
      currentIndex: number,
      newIndex: number,
      post: Post,
      historySnapshot: Post[]
    ) {
      const historyItem = {
        changeMade: `Moved post ${post.id} from index ${currentIndex} to index ${newIndex}`,
        historySnapshot: [...historySnapshot],
      }
      this.history.unshift(historyItem)
    },
    movePost(direction: MoveDirections, currentIndex: number) {
      const currentHistory = [...this.posts]
      const currentPost = this.posts.splice(currentIndex, 1)[0]
      const newIndex =
        direction === MoveDirections.UP ? currentIndex - 1 : currentIndex + 1
      this.posts.splice(newIndex, 0, currentPost)
      this.addHistoryItem(currentIndex, newIndex, currentPost, currentHistory)
    },
  },
})
