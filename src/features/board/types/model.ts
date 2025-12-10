export type Board = {
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
