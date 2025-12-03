import { apiPost } from '@/utils/api'

interface ReportReviewRequest {
  reviewId: number
  description: string
}

// 리뷰 신고 API
export async function reportReview({ reviewId, description }: ReportReviewRequest) {
  // 응답 데이터는 현재 사용하지 않으므로 타입을 any로 둠
  await apiPost<any>('/v1/reviews/report', {
    reviewId,
    description,
  })
}


