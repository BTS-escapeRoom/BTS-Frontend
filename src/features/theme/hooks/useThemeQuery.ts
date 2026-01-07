'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getThemeList } from '../api/getThemes'
import { getThemeDetail } from '../api/getThemeDetail'
import type { ThemeQueryParams } from '../api/getThemes.types'

const key = (params: Omit<ThemeQueryParams, 'page'>) => ['themes', params]

export function useInfiniteThemes(
  params: Omit<ThemeQueryParams, 'page'>,
  options?: { enabled?: boolean }
) {
  return useInfiniteQuery({
    queryKey: key(params),
    queryFn: ({ pageParam }) => getThemeList({ ...params, page: pageParam ?? 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.nextPage === -1 ? undefined : lastPage.nextPage),
    enabled: options?.enabled !== false,
  })
}

export function useThemeDetail(id: string | null) {
  return useQuery({
    queryKey: ['theme', 'detail', id],
    queryFn: () => getThemeDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5분
  })
}
