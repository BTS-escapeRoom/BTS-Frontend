'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getThemeList } from '../api/getThemes'
import type { ThemeQueryParams } from '../api/getThemes.types'

const key = (params: Omit<ThemeQueryParams, 'page'>) => ['themes', params]

export function useInfiniteThemes(params: Omit<ThemeQueryParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: key(params),
    queryFn: ({ pageParam }) => getThemeList({ ...params, page: pageParam ?? 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.nextPage === -1 ? undefined : lastPage.nextPage),
  })
}
