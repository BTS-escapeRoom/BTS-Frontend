import { apiGet } from '@/utils/api'
import type { BoardCommentsApiResponse } from './getBoardComments.types'

export async function getBoardComments(boardId: string | number) {
  const id = typeof boardId === 'number' ? boardId : Number(boardId)
  const json = await apiGet<BoardCommentsApiResponse>(`/v1/boards/${id}/comments`)
  return json.data
}
