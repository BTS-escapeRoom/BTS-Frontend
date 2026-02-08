// 나의 활동 API 응답 타입
export type MyBoardApiItem = {
  id: number
  type: 'recruit' | 'normal'
  title: string
  hit: number
  memberId: number
  profileImg: string | null
  memberName: string
  themeName: string | null
  storeName: string | null
  escapeDate: string | null
  recruitDeadline: string | null
  recruitPeople: number
  contactUrl: string | null
  contactMethod: string
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
  isPopular: boolean
}

export type MyBoardApiResponse = {
  code: string
  message: string | null
  data: MyBoardApiItem[]
}
