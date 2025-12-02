'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getReviews } from '../api/getReviews'
import type { ReviewsParams } from '../api/getReviews.types'

export function useInfiniteReviews(themeId: string) {
  return useInfiniteQuery({
    queryKey: ['reviews', themeId],
    queryFn: ({ pageParam = 0 }) => getReviews({ themeId, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 데이터가 limit(10)보다 적으면 더 이상 페이지가 없음
      if (lastPage.length < 10) {
        return undefined
      }
      // 다음 페이지는 현재까지 로드된 총 아이템 수
      return allPages.length * 10
    },
    enabled: !!themeId,
  })
}
