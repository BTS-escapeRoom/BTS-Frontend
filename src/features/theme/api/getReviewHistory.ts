import { apiGet } from '@/utils/api'
import type { ReviewHistoryApiResponse } from './getReviewHistory.types'

export async function getReviewHistory(memberId: number) {
  const json = await apiGet<ReviewHistoryApiResponse>(`/v1/reviews/history/${memberId}`)
  return json.data
}
