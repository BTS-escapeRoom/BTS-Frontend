export interface WeekdayTime {
  id: number
  time: string
}

export interface Store {
  id: number
  name: string
  thumbnail: string
  location: string
}

export interface ThemeDetailApiItem {
  id: number
  thumbnail: string
  title: string
  description: string
  minimumPeople: number
  maximumPeople: number
  recommendPeople: number
  difficulty: number
  genre: string
  scareScore: number
  time: number
  price: number
  reservationUrl: string
  notes: string
  registrationDate: string
  genreType: string
  status: string
  store: Store
  weekdaysTimeList: WeekdayTime[]
}

export interface ThemeDetailApiResponse {
  code: string
  message: string
  data: ThemeDetailApiItem
}

// 클라이언트에서 사용할 타입 (API 응답과 동일하지만 필요시 변환 가능)
export type ThemeDetail = ThemeDetailApiItem
