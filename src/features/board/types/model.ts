export type Board = {
  id: number
  type: 'recruit' | 'normal'
  title: string
  hit: number
  memberName: string
  themeName: string
  storeName: string
  escapeDate: string
  recruitDeadline: string
  recruitPeople: number
  contactUrl: string
  contactMethod: string
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
  isPopular: boolean
}

export type BoardDetail = {
  id: number
  type: 'recruit' | 'normal'
  title: string
  description: string
  memberName: string
  themeName: string
  storeName: string
  recruitDeadline: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  escapeDate: string | null // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  recruitPeople: number
  contactUrl: string | null
  contactMethod: string
  hit: number
  reportStatus: string
  likeCount: number
  commentCount: number
  createdAt: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  updatedAt: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  isPopular: boolean
}
