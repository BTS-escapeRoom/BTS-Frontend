import { apiGet } from '@/utils/api'
import type { MyReviewsApiResponse } from './getMyReviews.types'

export async function getMyReviews() {
  const json = await apiGet<MyReviewsApiResponse>('/v1/reviews/me')
  return json.data
}

