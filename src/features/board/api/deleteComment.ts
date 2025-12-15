import { apiDelete } from '@/utils/api'

interface DeleteCommentRequest {
  commentId: number
}

// 댓글 삭제 API (DELETE /v1/comments/{commentId})
export async function deleteComment({ commentId }: DeleteCommentRequest) {
  await apiDelete<void>(`/v1/comments/${commentId}`)
}
