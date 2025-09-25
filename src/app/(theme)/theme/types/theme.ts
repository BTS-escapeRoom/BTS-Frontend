export type Theme = {
  id: string
  title: string // 테마명
  store?: string // 업체명
  region?: string // 지역
  genre?: string // 장르
  genreType?: string // 장르 세부 유형
  difficulty?: number // 난이도 (1~5)
  time?: number // 소요시간 (분 단위)
  minimumPeople?: number // 최소 인원
  maximumPeople?: number // 최대 인원
  thumbnail?: string // 이미지 (없으면 placeholder)
  status?: 'active' | 'inactive' // 상태 (active: 운영중, inactive: 운영종료)
  district: string // 지역 (구)
}
