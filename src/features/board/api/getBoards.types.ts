// 요청 파라미터
export type BoardQueryParams = {
  keyword?: string
  type: 'recruit' | 'normal'
  sortType: 'popular' | 'viewed' | 'latest' | 'old'
  page?: number // 기본값: 1
}

// API 응답 원본 아이템
export type BoardApiItem = {
  id: number
  type: 'recruit' | 'normal'
  title: string
  hit: number
  memberName: string
  themeName: string
  storeName: string
  escapeDate: string
  recruitPeople: number
  contactUrl: string
  contactMethod: string
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
  isPopular: boolean
}

// API 응답 전체 스키마
export type BoardApiResponse = {
  code: string
  message: string
  data: {
    boards: BoardApiItem[]
    nextPage: number // -1이면 마지막 페이지
    totalPage: number
  }
}
