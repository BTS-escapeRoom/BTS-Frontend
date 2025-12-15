import { apiPost } from '@/utils/api'

interface ReportCommentRequest {
  commentId: number
  description: string
}

// 댓글 신고 API (POST /v1/comments/report)
export async function reportComment({ commentId, description }: ReportCommentRequest) {
  await apiPost<void>('/v1/comments/report', {
    commentId,
    description,
  })
}
