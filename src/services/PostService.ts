class PostService {
  public async getPosts() {
    try {
      const request = await fetch('https://jsonplaceholder.typicode.com/posts')
      return request.json()
    } catch (error) {
      throw new Error(<string>error)
    }
  }
}

export default new PostService()
