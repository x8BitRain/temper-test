import { defineStore } from 'pinia'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    history: [],
  }),
  actions: {
    async getPosts() {
      try {
        const request = await fetch(POSTS_URL)
        this.posts = await request.json()
      } catch (error) {
        throw new Error(<string>error)
      }
    },
    movePostUp(currentIndex: number) {
      const currentPost = this.posts.splice(currentIndex, 1)[0]
      this.posts.splice(currentIndex - 1, 0, currentPost)
    },
    movePostDown(currentIndex: number) {
      const currentPost = this.posts.splice(currentIndex, 1)[0]
      this.posts.splice(currentIndex + 1, 0, currentPost)
    },
  },
})
