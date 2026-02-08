import type { ThemeDetail } from './getThemeDetail.types'

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
  theme?: ThemeDetail // 테마 정보 (ThemeInfoButton 표시를 위해 필요)
}

export interface MyReviewsApiResponse {
  code: string
  message: string
  data: MyReview[]
}
