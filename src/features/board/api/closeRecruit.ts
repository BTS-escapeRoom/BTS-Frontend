import { apiPatch } from '@/utils/api'

// 모집글 마감 API (PATCH /v1/boards/{boardId}/close-recruit)
export async function closeRecruit(boardId: string | number) {
  const id = typeof boardId === 'number' ? boardId : Number(boardId)
  await apiPatch<{ data: null }>(`/v1/boards/${id}/close-recruit`)
}

