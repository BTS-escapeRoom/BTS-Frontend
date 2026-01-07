'use client'

import { useState } from 'react'
import Image from 'next/image'
import SChip from '@/components/chip/SChip'
import { IconClock, IconLockFull, IconLockHalf } from '@/components/icons'
import type { Theme } from '@/features/theme/types/model'

// 시간 포맷팅 (mm분ss초 형식)
function formatTimeLabel(totalMinutes?: number) {
  if (totalMinutes == null || Number.isNaN(totalMinutes)) return '??분'
  const minutes = Math.floor(totalMinutes)
  const secondsNum = Math.round((totalMinutes - minutes) * 60)
  const seconds = Math.max(0, Math.min(59, secondsNum))
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  if (seconds === 0) return `${mm}분`
  return `${mm}분${ss}초`
}

// 난이도 아이콘 렌더링
function renderDifficultyIcons(difficulty?: number) {
  if (difficulty == null || Number.isNaN(difficulty)) return null
  const full = Math.floor(difficulty)
  const hasHalf = difficulty - full > 0
  const icons: React.ReactNode[] = []
  for (let i = 0; i < full; i += 1) {
    icons.push(<IconLockFull key={`full-${i}`} fill="#424242" />)
  }
  if (hasHalf) {
    icons.push(<IconLockHalf key="half" fill="#424242" />)
  }
  return <div className="flex items-center gap-[2px]">{icons}</div>
}

// 난이도 Chip 컴포넌트
function DifficultyChip({ difficulty }: { difficulty?: number }) {
  if (difficulty == null || Number.isNaN(difficulty)) return null

  const difficultyText = difficulty.toFixed(1)
  const icons = renderDifficultyIcons(difficulty)

  return <SChip text={difficultyText} icon={icons} bgColor="gray02" textColor="gray06" />
}

function ThemeThumbnail({
  theme,
}: {
  theme: { thumbnail?: string; title: string; store?: string }
}) {
  const [imgError, setImgError] = useState(false)
  const showFallback = !theme.thumbnail || imgError

  return (
    <div className="relative h-[80px] w-[60px] shrink-0 overflow-hidden bg-gray06">
      {showFallback ? (
        <div className="absolute inset-0 flex items-center justify-center px-1">
          <span className="line-clamp-3 break-words text-center text-[10px] font-semibold text-white">
            {theme.title}_{theme.store}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={theme.thumbnail}
          alt={theme.title}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}

interface ThemeInfoItemProps {
  theme: Theme
  isSelected?: boolean
  onClick?: () => void
  infoText?: string
}

export default function ThemeInfoItem({
  theme,
  isSelected = false,
  onClick,
  infoText,
}: ThemeInfoItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[2px] bg-[#FAFAFA] p-2 text-left ${
        isSelected ? 'border border-gray07' : ''
      }`}
    >
      <div className="flex gap-2">
        {/* 좌측: 썸네일 */}
        <ThemeThumbnail theme={theme} />

        {/* 우측: 테마 정보 */}
        <div className="flex flex-1 flex-col gap-1">
          {/* 첫번째 줄: 테마명과 infoText */}
          <div className="flex items-center justify-between">
            <div className="text-14 font-bold text-gray06">{theme.title}</div>
            {infoText && <div className="text-12 text-gray06">{infoText}</div>}
          </div>

          {/* 두번째 줄: genre, difficulty, time chip */}
          <div className="flex flex-wrap items-center gap-[6px]">
            {theme.genreType && <SChip text={theme.genreType} />}
            <DifficultyChip difficulty={theme.difficulty} />
            {theme.time && <SChip text={formatTimeLabel(theme.time)} icon={<IconClock />} />}
          </div>

          {/* 세번째 줄: store 명 */}
          {theme.store && <div className="text-12 text-gray06">{theme.store}</div>}
        </div>
      </div>
    </button>
  )
}
