import { apiGet } from '@/utils/api'
import type { ReviewsApiResponse, ReviewsParams } from './getReviews.types'

export async function getReviews({ themeId, offset = 0, limit = 10 }: ReviewsParams) {
  const params = new URLSearchParams({
    themeId,
    offset: offset.toString(),
    limit: limit.toString(),
  })

  const json = await apiGet<ReviewsApiResponse>(`/v1/reviews?${params}`)
  return json.data
}
