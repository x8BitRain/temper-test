export enum MoveDirections {
  UP = 'up',
  DOWN = 'down',
}

export interface Post {
  id: string
  title: string
  content: string
}

export interface HistoryItem {
  changeMade: string
  historySnapshot: Post[]
}

export type PostsStore = {
  posts: Post[]
  history: HistoryItem[]
}