import { apiGet } from '@/utils/api'

export interface ReviewAvailableResponse {
  code: string
  message: string
  data: {
    isAvailable: boolean
  }
}

// 리뷰 작성 가능 여부 조회 API
export async function getReviewAvailable(themeId: string) {
  const json = await apiGet<ReviewAvailableResponse>(`/v1/reviews/${themeId}/available`)
  return json.data
}

