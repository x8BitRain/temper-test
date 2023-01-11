export enum MoveDirections {
  UP = 'up',
  DOWN = 'down',
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface HistoryItem {
  description: string
  historySnapshot: Post[]
}

export type PostsStore = {
  posts: Post[]
  history: HistoryItem[]
  error: string | null
}
