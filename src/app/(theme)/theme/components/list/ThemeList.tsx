'use client'

import { useEffect, useRef } from 'react'
import ThemeCard from './ThemeCard'
import { useInfiniteThemes } from '@/features/theme/hooks/useThemeQuery'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'
import EmptySearchResult from '@/components/empty/EmptySearchResult'

type ThemeListProps = {
  params: Omit<ThemeQueryParams, 'page'>
  onItemClick?: (id: string) => void
  className?: string
}

export default function ThemeList({ params, onItemClick, className = '' }: ThemeListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteThemes(params)

  const themes = data?.pages.flatMap((p) => p.themes) ?? []

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
      <div className={`grid grid-cols-2 gap-4 px-[16px] pb-[16px]${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full">
            <div className="aspect-[3/4] w-full animate-pulse rounded-md bg-gray-200" />
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
      <div className="px-6 pb-6 text-center text-sm text-red-600">
        데이터를 불러오지 못했어요. {(error as Error)?.message}
      </div>
    )
  }

  if (themes.length === 0) {
    // 검색어가 있을 때는 EmptySearchResult 컴포넌트 표시
    const hasKeyword = params.keyword && params.keyword.trim().length > 0
    console.log(params.keyword)
    return (
      <EmptySearchResult keyword={hasKeyword ? params.keyword : undefined} className={className} />
    )
  }

  return (
    <div className={`grid grid-cols-2 gap-4 px-4 pb-4 ${className}`}>
      {themes.map((theme) => (
        <div key={theme.id} onClick={() => onItemClick?.(theme.id)}>
          <ThemeCard theme={theme} />
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
