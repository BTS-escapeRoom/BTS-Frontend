import { apiGet } from '@/utils/api'
import type { Review } from './getReviews.types'

interface ReviewDetailApiResponse {
  code: string
  message: string
  data: Review
}

// 리뷰 단건 조회 API
export async function getReviewDetail(reviewId: string | number) {
  const id = typeof reviewId === 'number' ? reviewId : Number(reviewId)
  const json = await apiGet<ReviewDetailApiResponse>(`/v1/reviews/${id}`)
  return json.data
}
