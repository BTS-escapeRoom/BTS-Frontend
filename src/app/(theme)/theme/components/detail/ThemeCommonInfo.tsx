'use client'

import { useState } from 'react'
import type { ThemeDetail as ThemeDetailType } from '@/features/theme/api/getThemeDetail.types'
import GenreChip from '../GenreChip'
import SChip from '@/components/chip/SChip'
import { IconClock, IconLockFull, IconLockHalf } from '@/components/icons'

type ThemeCommonInfoProps = {
  theme: Pick<
    ThemeDetailType,
    'thumbnail' | 'title' | 'genreType' | 'time' | 'minimumPeople' | 'maximumPeople' | 'difficulty'
  >
}

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

function renderPeople(minimumPeople?: number, maximumPeople?: number) {
  const hasMin = typeof minimumPeople === 'number' && Number.isFinite(minimumPeople)
  const hasMax = typeof maximumPeople === 'number' && Number.isFinite(maximumPeople)
  if (!hasMin && !hasMax) return null
  if (hasMin && hasMax) return `인원: ${minimumPeople}~${maximumPeople}인`
  const n = hasMin ? minimumPeople : maximumPeople
  return `인원: ${n}인`
}

function renderDifficultyIcons(difficulty?: number) {
  if (difficulty == null || Number.isNaN(difficulty)) return null
  const full = Math.floor(difficulty)
  const hasHalf = difficulty - full > 0
  const icons: React.ReactNode[] = []
  for (let i = 0; i < full; i += 1) {
    icons.push(<IconLockFull key={`full-${i}`} />)
  }
  if (hasHalf) {
    icons.push(<IconLockHalf key="half" />)
  }
  return <div className="flex items-center gap-[2px]">{icons}</div>
}

export default function ThemeCommonInfo({ theme }: ThemeCommonInfoProps) {
  const timeLabel = formatTimeLabel(theme.time)
  const peopleLabel = renderPeople(theme.minimumPeople, theme.maximumPeople)
  const difficultyIcons = renderDifficultyIcons(theme.difficulty)
  const difficultyText =
    theme.difficulty == null || Number.isNaN(theme.difficulty)
      ? '??'
      : (theme.difficulty as number).toFixed(1)
  const [imgError, setImgError] = useState(false)
  const showFallback = !theme.thumbnail || imgError

  return (
    <div className="flex items-start gap-[16px]">
      {/* Left: thumbnail with 3:4 ratio */}
      <div className="relative aspect-[3/4] w-full max-w-[40%] flex-1 self-start overflow-hidden bg-gray06">
        {showFallback ? (
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-semibold-12 line-clamp-3 break-words text-center text-white">
              {theme.title}_{(theme as any).store?.name}
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={theme.thumbnail}
            alt={theme.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="w-[168px] shrink-0">
        {/* title: 16px bold, char-based wrap */}
        <h3 className="break-all text-16 font-bold leading-[1.3] text-[#000]">{theme.title}</h3>

        <div className="mt-[6px] flex flex-wrap items-center gap-[6px]">
          <GenreChip genre={theme.genreType} />
          <SChip text={timeLabel} icon={<IconClock />} />
        </div>

        {peopleLabel && <div className="mt-[8px] text-14 text-gray07">{peopleLabel}</div>}

        <div className="mt-[8px] flex items-center text-14 text-gray07">
          <span>난이도:</span>
          <span className="mb-[1px] ml-[2px] inline-flex items-center">{difficultyIcons}</span>
          <span className="ml-[4px]">{difficultyText}</span>
        </div>
      </div>
    </div>
  )
}
