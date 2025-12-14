// API 응답 원본 데이터
export type BoardCommentApiItem = {
  id: number
  comment: string
  memberName: string
  memberId: number
  isDeleted: boolean
  isReported: boolean
  createdAt: string // ISO 8601 형식: 2025-12-09T18:22:36.644+00:00
}

// API 응답 전체 스키마
export type BoardCommentsApiResponse = {
  code: string
  message: string
  data: {
    comments: BoardCommentApiItem[]
    totalCount: number
  }
}
