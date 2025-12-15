import { apiPost } from '@/utils/api'

// 모집글 등록 요청 바디
export interface CreateBoardRequest {
  // 테마 선택 안 할 수 있으므로 optional
  themeId?: number
  // 현재는 모집글만 사용하므로 'recruit' 고정
  type: 'recruit'
  title: string
  description: string
  // 서버 스펙에 맞춰 snake_case 그대로 사용
  recruit_deadline: string // ISO 8601 형식
  escape_date?: string | null // ISO 8601 형식, null 가능
  recruit_people: number
  contact_url?: string
  contact_method: string
}

interface CreateBoardResponse {
  id: number
}

// 모집글 등록 API (POST /v1/boards)
export async function createBoard(data: CreateBoardRequest) {
  const response = await apiPost<{ data: CreateBoardResponse }>('/v1/boards', data)
  return response.data
}
