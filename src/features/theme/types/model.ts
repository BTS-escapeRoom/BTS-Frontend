export type Theme = {
  id: string
  status?: 'active' | 'inactive'
  thumbnail?: string
  title: string
  time?: number
  difficulty?: number
  genre?: string
  genreType?: string
  store?: string
  district?: string
  city?: string
  minimumPeople?: number
  maximumPeople?: number
  region?: string
}
