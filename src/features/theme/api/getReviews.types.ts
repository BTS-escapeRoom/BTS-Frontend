export interface Review {
  id: number
  content: string
  people: number | null
  remainingTime: number
  elapsedTime: number
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate: string | null
  hints: number | null
  isSuccess: boolean
  createdAt: string
  isMyReview: boolean
  nickname: string
}

export interface ReviewsApiResponse {
  code: string
  message: string
  data: Review[]
}

export interface ReviewsParams {
  themeId: string
  offset?: number
  limit?: number
}
