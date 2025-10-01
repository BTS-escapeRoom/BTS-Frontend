import ThemeList from './components/ThemeList'
import QueryProvider from './components/QueryProvider'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'

type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// 단일 숫자 파싱
function toNum(v?: string | string[]) {
  if (v == null) return undefined
  const s = Array.isArray(v) ? v[0] : v
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

// 다중 숫자 배열 파싱 (쉼표/중복 키 모두 지원)
function toNumArray(v?: string | string[]) {
  if (v == null) return undefined
  const arr = Array.isArray(v) ? v : v.split(',')
  const nums = arr
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => Number(x))
    .filter((n) => Number.isFinite(n))
  return nums.length ? nums : undefined
}

export default async function ThemePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams

  const params: Omit<ThemeQueryParams, 'page'> = {
    sort: resolvedSearchParams?.sort as ThemeQueryParams['sort'],
    genreIdList: toNumArray(resolvedSearchParams?.genreIdList),
    districtIdList: toNumArray(resolvedSearchParams?.districtIdList),
    cityIdList: toNumArray(resolvedSearchParams?.cityIdList),
    minDiff: toNum(resolvedSearchParams?.minDiff),
    maxDiff: toNum(resolvedSearchParams?.maxDiff),
    peoples: toNum(resolvedSearchParams?.peoples),
    latitude: toNum(resolvedSearchParams?.latitude),
    longitude: toNum(resolvedSearchParams?.longitude),
    keyword: resolvedSearchParams?.keyword as string,
  }

  return (
    <QueryProvider>
      <ThemeList params={params} />
    </QueryProvider>
  )
}
