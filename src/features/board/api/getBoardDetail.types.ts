// API 응답 원본 데이터
export type BoardDetailApiItem = {
  id: number
  type: 'recruit' | 'normal'
  title: string
  description: string
  memberName: string
  themeName: string
  storeName: string
  escapeDate: string | null // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  recruitPeople: number
  contactUrl: string | null
  contactMethod: string
  createdAt: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  updatedAt: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  recruitDeadline: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
  hit: number
  reportStatus: string
  likeCount: number
  commentCount: number
  isPopular: boolean
}

// API 응답 전체 스키마
export type BoardDetailApiResponse = {
  code: string
  message: string
  data: BoardDetailApiItem
}
