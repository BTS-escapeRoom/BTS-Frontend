'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyBoards, getMyLikedBoards } from '../api/getMyBoards'

export type MyBoardType = 'my' | 'liked' | 'commented'

export function useInfiniteMyBoards(type: MyBoardType) {
  const queryFn = type === 'liked' ? getMyLikedBoards : getMyBoards

  return useQuery({
    queryKey: ['myBoards', type],
    queryFn: () => queryFn(), // 파라미터 없이 일괄 조회
    enabled: type !== 'commented', // 댓글 단 글은 아직 미개발
    select: (data) => ({
      pages: [{ boards: data.boards }],
      pageParams: [1],
    }),
  })
}
