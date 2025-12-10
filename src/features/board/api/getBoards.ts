import { apiGet } from '@/utils/api'
import type { Board } from '../types/model'
import type { BoardApiItem, BoardApiResponse, BoardQueryParams } from './getBoards.types'

// 쿼리 파라미터 빌드
function buildQuery(params: BoardQueryParams) {
  const qs = new URLSearchParams()
  
  if (params.keyword) {
    qs.append('keyword', params.keyword)
  }
  
  qs.append('type', params.type)
  qs.append('sortType', params.sortType)
  qs.append('page', String(params.page ?? 1))
  
  return qs.toString()
}

// API 응답을 도메인 모델로 변환
function mapToBoard(item: BoardApiItem): Board {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    hit: item.hit,
    memberName: item.memberName,
    themeName: item.themeName,
    storeName: item.storeName,
    escapeDate: item.escapeDate,
    recruitPeople: item.recruitPeople,
    contactUrl: item.contactUrl,
    contactMethod: item.contactMethod,
    likeCount: item.likeCount,
    commentCount: item.commentCount,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }
}

export async function getBoardList(params: BoardQueryParams) {
  const q = buildQuery(params)
  const json = await apiGet<BoardApiResponse>(`/v1/boards?${q}`)

  const boards = json.data.boards.map(mapToBoard)
  const nextPage = json.data.nextPage
  const totalPage = json.data.totalPage
  
  return { boards, nextPage, totalPage }
}

