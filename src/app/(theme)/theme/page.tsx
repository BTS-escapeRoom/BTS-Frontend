import ThemeList from './components/ThemeList'
import QueryProvider from './components/QueryProvider'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'

// Next.js App Router: page props 타입
type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
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

export default function ThemePage({ searchParams = {} }: PageProps) {
  const params: Omit<ThemeQueryParams, 'page'> = {
    // keyword: typeof searchParams.keyword === 'string' ? searchParams.keyword : undefined,
    // peoples: toNum(searchParams.peoples),
    // minDiff: toNum(searchParams.minDiff),
    // maxDiff: toNum(searchParams.maxDiff),
    // genreIdList: toNumArray(searchParams.genreIdList),
    // districtIdList: toNumArray(searchParams.districtIdList),
    // cityIdList: toNumArray(searchParams.cityIdList),
    // sort:
    //   searchParams.sort === 'popular' ||
    //   searchParams.sort === 'distance' ||
    //   searchParams.sort === 'recent'
    //     ? (searchParams.sort as 'popular' | 'distance' | 'recent')
    //     : 'recent',
    // latitude: toNum(searchParams.latitude),
    // longitude: toNum(searchParams.longitude),
    // page는 useInfiniteQuery가 관리하므로 주지 않음
  }

  return (
    <QueryProvider>
      <ThemeList params={params} />
    </QueryProvider>
  )
}
