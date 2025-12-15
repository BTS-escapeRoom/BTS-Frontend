import { apiPut } from '@/utils/api'

interface UpdateCommentRequest {
  commentId: number
  comment: string
}

// 댓글 수정 API (PUT /v1/comments/{commentId})
export async function updateComment({ commentId, comment }: UpdateCommentRequest) {
  await apiPut<void>(`/v1/comments/${commentId}`, {
    comment,
  })
}
