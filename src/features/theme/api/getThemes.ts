import { apiGet } from '@/utils/api'
import type { Theme } from '../types/model'
import type { ThemeApiItem, ThemeApiResponse, ThemeQueryParams } from './getThemes.types'

// ?a=1&a=2 형태로 배열 직렬화
function buildQuery(params: ThemeQueryParams = {}) {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    if (Array.isArray(value)) {
      value.forEach((v) => qs.append(key, String(v)))
    } else {
      qs.append(key, String(value))
    }
  })
  return qs.toString()
}

function mapToTheme(item: ThemeApiItem): Theme {
  return {
    id: String(item.id),
    thumbnail: item.thumbnail,
    title: item.title,
    time: item.time,
    difficulty: item.difficulty,
    genre: item.genre,
    genreType: item.genreType,
    store: item.store,
    district: item.district,
    city: item.city,
    minimumPeople: item.minimumPeople,
    maximumPeople: item.maximumPeople,
  }
}

export async function getThemeList(params: ThemeQueryParams) {
  if (params.sort === 'distance' && (params.latitude == null || params.longitude == null)) {
    console.warn('[getThemeList] sort=distance requires latitude & longitude')
  }

  const q = buildQuery(params)
  const json = await apiGet<ThemeApiResponse>(`/v1/themes?${q}`)

  const themes = json.data.themes.map(mapToTheme)
  const nextPage = json.data.nextPage
  const totalPage = json.data.totalPage
  return { themes, nextPage, totalPage }
}
