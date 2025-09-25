'use client'

import { useEffect, useRef } from 'react'
import ThemeCard from './ThemeCard'
import { useInfiniteThemes } from '@/features/theme/hooks/useThemeQuery'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'

type ThemeListProps = {
  params: Omit<ThemeQueryParams, 'page'>
  onItemClick?: (id: string) => void
  emptyText?: string
  className?: string
}

export default function ThemeList({
  params,
  onItemClick,
  emptyText = '검색 결과가 없습니다.',
  className = '',
}: ThemeListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteThemes(params)

  const items = data?.pages.flatMap((p) => p.themes) ?? []

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
      <div className={`grid grid-cols-2 gap-4 p-4 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-[150px]">
            <div className="h-[190px] w-full animate-pulse rounded-md bg-gray-200" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mt-1 h-3 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mt-1 h-5 w-28 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-sm text-red-600">
        데이터를 불러오지 못했어요. {(error as Error)?.message}
      </div>
    )
  }

  if (items.length === 0) {
    return <div className="p-8 text-center text-14 text-gray05">{emptyText}</div>
  }

  return (
    <div className={`grid grid-cols-2 gap-4 p-4 ${className}`}>
      {items.map((item) => (
        <div key={item.id} onClick={() => onItemClick?.(item.id)}>
          <ThemeCard theme={item} />
        </div>
      ))}

      {/* 무한스크롤 sentinel */}
      <div ref={sentinelRef} className="col-span-2 h-6" />

      {isFetchingNextPage && (
        <div className="col-span-2 py-4 text-center text-12 text-gray05">불러오는 중…</div>
      )}
    </div>
  )
}
