import { apiPatch } from '@/utils/api'

// 모집글 수정 요청 바디 (등록과 동일 스펙)
export interface UpdateBoardRequest {
  themeId?: number
  type: 'recruit'
  title: string
  description: string
  recruit_deadline: string // ISO 8601 형식
  escape_date?: string | null // ISO 8601 형식, null 가능
  recruit_people: number
  contact_url?: string
  contact_method: string
}

interface UpdateBoardResponse {
  id: number
}

// 모집글 수정 API (PATCH /v1/boards/{boardId})
export async function updateBoard(boardId: string | number, data: UpdateBoardRequest) {
  const id = typeof boardId === 'number' ? boardId : Number(boardId)
  const response = await apiPatch<{ data: UpdateBoardResponse }>(`/v1/boards/${id}`, data)
  return response.data
}
