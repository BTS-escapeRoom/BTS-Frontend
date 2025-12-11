import { apiGet } from '@/utils/api'
import type { BoardDetail } from '../types/model'
import type { BoardDetailApiItem, BoardDetailApiResponse } from './getBoardDetail.types'

// API 응답을 도메인 모델로 변환
function mapToBoardDetail(item: BoardDetailApiItem): BoardDetail {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    memberName: item.memberName,
    themeName: item.themeName,
    storeName: item.storeName,
    recruitDeadline: item.recruitDeadline,
    escapeDate: item.escapeDate,
    recruitPeople: item.recruitPeople,
    contactUrl: item.contactUrl,
    contactMethod: item.contactMethod,
    hit: item.hit,
    reportStatus: item.reportStatus,
    likeCount: item.likeCount,
    commentCount: item.commentCount,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isPopular: item.isPopular,
  }
}

export async function getBoardDetail(boardId: string | number) {
  const id = typeof boardId === 'number' ? boardId : Number(boardId)
  const json = await apiGet<BoardDetailApiResponse>(`/v1/boards/${id}`)
  return mapToBoardDetail(json.data)
}
