'use client'

import { useEffect, useRef } from 'react'
import RecruitBoardCard from './RecruitBoardCard'
import { useInfiniteBoards } from '@/features/board'
import type { BoardQueryParams } from '@/features/board/api/getBoards.types'
import EmptySearchResult from '@/components/empty/EmptySearchResult'

type RecruitBoardListProps = {
  params: Omit<BoardQueryParams, 'page'>
  onItemClick?: (boardId: number) => void
  emptyText?: string
  className?: string
}

export default function RecruitBoardList({
  params,
  onItemClick,
  emptyText = '게시글이 없습니다.',
  className = '',
}: RecruitBoardListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteBoards(params)

  const boards = data?.pages.flatMap((p) => p.boards) ?? []

  // 무한스크롤 sentinel
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return
    const el = sentinelRef.current

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) fetchNextPage()
        })
      },
      { rootMargin: '200px' }, // 미리 로드
    )

    io.observe(el)
    return () => io.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className={`space-y-0 ${className}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-gray02 bg-white px-4 py-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray02" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray02" />
            <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray02" />
            <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-gray02" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className={`px-6 py-8 text-center text-14 text-red-500 ${className}`}>
        게시글을 불러오는 중 오류가 발생했습니다. {(error as Error)?.message}
      </div>
    )
  }

  if (boards.length === 0) {
    // 검색어가 있을 때는 EmptySearchResult 컴포넌트 표시
    const hasKeyword = params.keyword && params.keyword.trim().length > 0
    return (
      <EmptySearchResult keyword={hasKeyword ? params.keyword : undefined} className={className} />
    )
  }

  return (
    <div className={`space-y-0 ${className}`}>
      {boards.map((board, index) => (
        <RecruitBoardCard
          key={board.id}
          board={board}
          onClick={onItemClick}
          isLast={index === boards.length - 1}
        />
      ))}

      {/* 무한스크롤 sentinel */}
      <div ref={sentinelRef} className="h-6" />

      {isFetchingNextPage && (
        <div className="py-4 text-center text-12 text-gray05">불러오는 중…</div>
      )}
    </div>
  )
}
