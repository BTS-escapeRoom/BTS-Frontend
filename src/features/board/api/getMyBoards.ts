import { apiGet } from '@/utils/api'
import type { Board } from '../types/model'
import type { MyBoardApiItem, MyBoardApiResponse } from './getMyBoards.types'

// API 응답을 도메인 모델로 변환
function mapToBoard(item: MyBoardApiItem): Board {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    hit: item.hit,
    memberName: item.memberName,
    themeName: item.themeName || '',
    storeName: item.storeName || '',
    escapeDate: item.escapeDate || '',
    recruitDeadline: item.recruitDeadline || '',
    recruitPeople: item.recruitPeople,
    contactUrl: item.contactUrl || '',
    contactMethod: item.contactMethod,
    likeCount: item.likeCount,
    commentCount: item.commentCount,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isPopular: item.isPopular,
  }
}

// 내가 쓴 게시글 조회 (파라미터 없이 일괄 조회)
export async function getMyBoards() {
  const json = await apiGet<MyBoardApiResponse>(`/v1/boards/my`)

  const boards = json.data.map(mapToBoard)

  return { boards }
}

// 나의 관심글 조회 (파라미터 없이 일괄 조회)
export async function getMyLikedBoards() {
  const json = await apiGet<MyBoardApiResponse>(`/v1/boards/like`)

  const boards = json.data.map(mapToBoard)

  return { boards }
}
