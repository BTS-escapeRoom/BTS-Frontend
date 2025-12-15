import { apiPost } from '@/utils/api'

interface ReportBoardRequest {
  boardId: number
  description: string
}

// 모집글 신고 API (POST /v1/boards/report)
export async function reportBoard({ boardId, description }: ReportBoardRequest) {
  await apiPost<any>('/v1/boards/report', {
    boardId,
    description,
  })
}
