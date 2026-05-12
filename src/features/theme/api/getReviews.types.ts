export interface Review {
  id: number
  content: string
  people: number | null
  remainingTime: number
  elapsedTime: number
  timeType: 'REMAINING' | 'ELAPSED' | 'NONE'
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate: string | null
  hints: number | null
  isSuccess: boolean
  createdAt: string
  isMyReview: boolean
  nickname: string
  /** 신고로 숨김 처리된 리뷰 */
  isReported?: boolean
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
