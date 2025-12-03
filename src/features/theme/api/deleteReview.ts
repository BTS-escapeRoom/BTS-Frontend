import { apiDelete } from '@/utils/api'

// 리뷰 삭제 API
export async function deleteReview(reviewId: number) {
  // 응답 데이터는 현재 사용하지 않으므로 any 사용
  await apiDelete<any>(`/v1/reviews/${reviewId}`)
}

