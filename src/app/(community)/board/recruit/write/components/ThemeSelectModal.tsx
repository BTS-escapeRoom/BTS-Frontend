'use client'

import { useState, useRef, useEffect } from 'react'
import IconSearch from '@/components/icons/Search'
import IconInputCancel from '@/components/icons/InputCancel'
import SButton from '@/components/button/SButton'
import ThemeInfoItem from './ThemeInfoItem'
import { useInfiniteThemes } from '@/features/theme/hooks/useThemeQuery'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'
import type { Theme } from '@/features/theme/types/model'

interface ThemeSelectModalProps {
  onSelect: (theme: Theme) => void
}

export default function ThemeSelectModal({ onSelect }: ThemeSelectModalProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const trimmedKeyword = searchKeyword.trim()
  const hasKeyword = trimmedKeyword.length > 0

  const params: Omit<ThemeQueryParams, 'page'> = {
    sort: 'recent',
    keyword: hasKeyword ? trimmedKeyword : undefined,
  }

  // 검색어가 있을 때만 쿼리 활성화
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteThemes(params, { enabled: hasKeyword })

  const themes = data?.pages.flatMap((p) => p.themes) ?? []
  const selectedTheme = themes.find((t) => t.id === selectedThemeId)

  // 무한스크롤
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || !hasKeyword) return
    const el = sentinelRef.current

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) fetchNextPage()
        })
      },
      { rootMargin: '200px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [hasNextPage, fetchNextPage, hasKeyword])

  const handleThemeClick = (theme: Theme) => {
    setSelectedThemeId(theme.id)
  }

  const handleClear = () => {
    setSearchKeyword('')
    setSelectedThemeId(null)
    inputRef.current?.focus()
  }

  const handleComplete = () => {
    if (!selectedTheme) return
    onSelect(selectedTheme)
  }

  const renderContent = () => {
    // 검색어 입력 전
    if (!hasKeyword) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-14 text-gray05">연결할 테마를 검색해주세요</div>
        </div>
      )
    }

    // 에러
    if (isError) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-14 text-red-600">데이터를 불러오지 못했어요.</div>
        </div>
      )
    }

    // 검색 결과 없음
    if (themes.length === 0) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-14 text-gray05">
            &apos;{trimmedKeyword}&apos;에 대한
            <br />
            검색 결과가 없습니다.
          </div>
        </div>
      )
    }

    // 검색 결과 있음
    return (
      <div ref={listRef} className="flex flex-col gap-2 px-4 py-4">
        {themes.map((theme) => (
          <ThemeInfoItem
            key={theme.id}
            theme={theme}
            isSelected={theme.id === selectedThemeId}
            onClick={() => handleThemeClick(theme)}
            infoText={theme.id === selectedThemeId ? '선택됨' : undefined}
          />
        ))}

        {/* 무한스크롤 sentinel */}
        {hasNextPage && <div ref={sentinelRef} className="h-6" />}

        {isFetchingNextPage && (
          <div className="py-4 text-center text-12 text-gray05">불러오는 중…</div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#F6F6F6] bg-white px-[16px] pb-[10px] pt-[16px]">
        <div className="relative">
          <div
            className={`flex h-9 items-center rounded-md border px-2 ${
              hasKeyword ? 'border-gray05 bg-white' : 'border-[#CED7DE] bg-white'
            }`}
          >
            <IconSearch width={20} height={20} fill={hasKeyword ? '#757575' : '#CED7DE'} />
            <input
              ref={inputRef}
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="원하는 테마 또는 업체명 검색"
              className={`ml-2 flex-1 border-none bg-transparent text-14 outline-none ${
                hasKeyword ? 'text-gray06' : 'text-[#8B8B8C]'
              }`}
            />
            {hasKeyword && (
              <button
                onClick={handleClear}
                className="ml-2 flex items-center justify-center"
                aria-label="검색어 지우기"
              >
                <IconInputCancel width={20} height={20} fill="#757575" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
      <div className="border-t border-gray02 bg-white p-[16px]">
        <SButton onClick={handleComplete} disabled={!selectedTheme}>
          선택 완료
        </SButton>
      </div>
    </div>
  )
}
