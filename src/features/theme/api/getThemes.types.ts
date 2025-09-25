// 요청 파라미터
export type ThemeQueryParams = {
  keyword?: string
  peoples?: number
  minDiff?: number
  maxDiff?: number
  genreIdList?: number[]
  districtIdList?: number[]
  cityIdList?: number[]
  sort?: 'recent' | 'popular' | 'distance'
  latitude?: number
  longitude?: number
  page?: number // 1부터 시작
}

// API 응답 원본 아이템
export type ThemeApiItem = {
  id: number
  thumbnail: string
  title: string
  minimumPeople: number
  maximumPeople: number
  difficulty: number
  genre: string
  time: number
  genreType: string
  status: string
  store: string
  city: string
  district: string
}

// API 응답 전체 스키마
export type ThemeApiResponse = {
  code: string
  message: string
  data: {
    themes: ThemeApiItem[]
    nextPage: number // -1이면 마지막 페이지
    totalPage: number
  }
}
