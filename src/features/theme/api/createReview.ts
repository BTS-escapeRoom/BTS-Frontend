import { apiPost } from '@/utils/api'

interface CreateReviewRequest {
  themeId: string
  content?: string
  people?: number
  remainingTime?: number
  elapsedTime?: number
  difficulty: number
  scareScore: number
  activityScore: number
  visitDate?: string
  hints?: number
  isSuccess: boolean
}

interface CreateReviewResponse {
  id: number
}

// 리뷰 작성 API
export async function createReview(data: CreateReviewRequest) {
  const response = await apiPost<{ data: CreateReviewResponse }>('/v1/reviews', data)
  return response.data
}
