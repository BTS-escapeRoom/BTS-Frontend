export interface Review {
  id: number
  content: string
  people: number
  time: number
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate: string
  hints: number
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
