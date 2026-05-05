export interface MyReview {
  id: number
  content: string
  people: number | null
  elapsedTime: number
  remainingTime: number
  timeType: 'ELAPSED' | 'REMAINING' | 'NONE'
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate: string | null
  hints: number | null
  isSuccess: boolean
  createdAt: string
  isMyReview: boolean
  nickname: string
  themeId?: number | null
  themeTitle?: string | null
  themeThumbnail?: string | null
  themeGenre?: string | null
  themeCity?: string | null
  themeDistrict?: string | null
  genreType?: string | null
  storeName?: string | null
  time?: number | null
}

export interface MyReviewsApiResponse {
  code: string
  message: string
  data: MyReview[]
}
