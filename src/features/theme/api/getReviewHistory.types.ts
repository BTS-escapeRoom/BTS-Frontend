export interface ReviewHistory {
  reviewId: number
  storeName: string
  themeTitle: string
  time: number | null
  // TODO: 백엔드에 필드가 추가되면 optional을 제거하고 실제 스키마에 맞춥니다.
  isSuccess?: boolean
}

export interface ReviewHistoryApiResponse {
  code: string
  message: string
  data: ReviewHistory[]
}
