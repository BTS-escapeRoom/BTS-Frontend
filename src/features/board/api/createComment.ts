import { apiPost, type ApiResponse } from '@/utils/api'

interface CreateCommentRequest {
  boardId: number
  comment: string
}

interface CreateCommentResponse {
  id: number
}

// 댓글 작성 API (POST /v1/comments)
export async function createComment({ boardId, comment }: CreateCommentRequest) {
  const response = await apiPost<ApiResponse<CreateCommentResponse>>('/v1/comments', {
    boardId,
    comment,
  })

  return response.data
}
