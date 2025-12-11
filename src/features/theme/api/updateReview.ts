import { apiPut } from '@/utils/api'

interface UpdateReviewRequest {
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

interface UpdateReviewResponse {
  id: number
}

// 리뷰 수정 API
export async function updateReview(reviewId: string | number, data: UpdateReviewRequest) {
  const response = await apiPut<{ data: UpdateReviewResponse }>(`/v1/reviews/${reviewId}`, data)
  return response.data
}
