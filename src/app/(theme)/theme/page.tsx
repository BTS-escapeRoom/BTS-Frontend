import ThemePageClient from './components/ThemePageClient'
import QueryProvider from './components/QueryProvider'
import ThemeSearchBar from './components/list/ThemeSearchBar'
import ThemeSortDropdown from './components/list/ThemeSortDropdown'
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

  const sort = (resolvedSearchParams?.sort as ThemeQueryParams['sort']) || 'distance'

  const params: Omit<ThemeQueryParams, 'page'> = {
    sort,
    genreIdList: toNumArray(resolvedSearchParams?.genreIdList),
    districtIdList: toNumArray(resolvedSearchParams?.districtIdList),
    cityIdList: toNumArray(resolvedSearchParams?.cityIdList),
    minDiff: toNum(resolvedSearchParams?.minDiff),
    maxDiff: toNum(resolvedSearchParams?.maxDiff),
    peoples: toNum(resolvedSearchParams?.peoples),
    // 거리순일 때만 위도/경도 포함 (임시로 기본값 설정)
    ...(sort === 'distance' && {
      latitude: toNum(resolvedSearchParams?.latitude) || 37.5665, // 서울시청 위도
      longitude: toNum(resolvedSearchParams?.longitude) || 126.978, // 서울시청 경도
    }),
    keyword: resolvedSearchParams?.keyword as string,
  }

  return (
    <QueryProvider>
      <ThemeSearchBar />
      <div className="px-4 pb-2 pt-2">
        <ThemeSortDropdown />
      </div>
      <ThemePageClient params={params} />
    </QueryProvider>
  )
}
