import type { Theme } from '../types/model'
import type { ThemeApiItem, ThemeApiResponse, ThemeQueryParams } from './getThemes.types'

const BASE_URL = 'https://apis.bangtal-boys.com'

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

export async function fetchThemes(params: ThemeQueryParams) {
  if (params.sort === 'distance' && (params.latitude == null || params.longitude == null)) {
    console.warn('[fetchThemes] sort=distance requires latitude & longitude')
  }

  const q = buildQuery(params)
  const res = await fetch(`${BASE_URL}/v1/themes?${q}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    const errJson = await res.json().catch(() => null)
    const msg = errJson?.message ?? `HTTP ${res.status}`
    throw new Error(msg)
  }

  const json = (await res.json()) as ThemeApiResponse
  const themes = json.data.themes.map(mapToTheme)
  const nextPage = json.data.nextPage
  const totalPage = json.data.totalPage
  return { themes, nextPage, totalPage }
}
