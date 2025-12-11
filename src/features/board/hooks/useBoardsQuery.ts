'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getBoardList } from '../api/getBoards'
import { getBoardDetail } from '../api/getBoardDetail'
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

export function useBoardDetail(boardId: string | number | null) {
  return useQuery({
    queryKey: ['board', 'detail', boardId],
    queryFn: () => getBoardDetail(boardId!),
    enabled: !!boardId,
    staleTime: 5 * 60 * 1000, // 5분
  })
}
