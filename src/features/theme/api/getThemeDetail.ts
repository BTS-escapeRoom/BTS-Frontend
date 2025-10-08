import { apiGet } from '@/utils/api'
import type { ThemeDetail, ThemeDetailApiResponse } from './getThemeDetail.types'

function mapToThemeDetail(item: ThemeDetailApiResponse['data']): ThemeDetail {
  return {
    id: item.id,
    thumbnail: item.thumbnail,
    title: item.title,
    description: item.description,
    minimumPeople: item.minimumPeople,
    maximumPeople: item.maximumPeople,
    recommendPeople: item.recommendPeople,
    difficulty: item.difficulty,
    genre: item.genre,
    scareScore: item.scareScore,
    time: item.time,
    price: item.price,
    reservationUrl: item.reservationUrl,
    notes: item.notes,
    registrationDate: item.registrationDate,
    genreType: item.genreType,
    status: item.status,
    store: item.store,
    weekdaysTimeList: item.weekdaysTimeList,
  }
}

export async function getThemeDetail(id: string): Promise<ThemeDetail> {
  const json = await apiGet<ThemeDetailApiResponse>(`/v1/themes/${id}`)
  return mapToThemeDetail(json.data)
}
