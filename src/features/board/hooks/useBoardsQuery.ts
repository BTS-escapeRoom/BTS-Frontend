'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getBoardList } from '../api/getBoards'
import type { BoardQueryParams } from '../api/getBoards.types'

const key = (params: Omit<BoardQueryParams, 'page'>) => ['boards', params]

export function useInfiniteBoards(params: Omit<BoardQueryParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: key(params),
    queryFn: ({ pageParam }) => getBoardList({ ...params, page: pageParam ?? 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.nextPage === -1 ? undefined : lastPage.nextPage),
  })
}
