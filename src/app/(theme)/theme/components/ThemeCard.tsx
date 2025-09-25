'use client'
import Image from 'next/image'
import { Theme } from '@/features/theme'
import SChip from '@/components/chip/SChip'
import { IconClock } from '@/components/icons'
import GenreChip from './GenreChip'
import { useState } from 'react'

type ThemeCardProps = {
  theme: Theme
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const { title, store, district, genreType, time, difficulty, thumbnail } = theme
  const [hasError, setHasError] = useState(false)

  const showFallback = !thumbnail || hasError
  return (
    <div className="flex w-[150px] flex-col">
      {/* 이미지 영역 */}
      <div className="relative h-[190px] w-full overflow-hidden rounded-md bg-gray06">
        {showFallback ? (
          <div className="flex h-full w-full items-center justify-center px-2">
            <span className="text-semibold-12 line-clamp-3 break-words text-center text-white">
              {title}_{store}
            </span>
          </div>
        ) : (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            onError={() => setHasError(true)}
            unoptimized // 필요 시 최적화 우회
          />
        )}
      </div>

      {/* 정보 영역 */}
      <div className="mt-[8px] flex flex-col gap-[4px]">
        <div className="text-bold-16 truncate text-[#151515]">{title}</div>
        <div className="item-center flex flex-nowrap gap-[4px] text-[#414141]">
          <span className="truncate text-12 font-semibold">{store}</span>
          <span className="text-12 font-semibold text-[#B9B9B9]">|</span>
          <span className="whitespace-nowrap text-12">{district}</span>
        </div>
        <div className="item-center flex gap-[2px]">
          {genreType && <GenreChip genre={genreType} />}
          <SChip text={`${time}분`} icon={<IconClock />} />
          <SChip text={`난이도 ${difficulty}`} bgColor="transparent" />
        </div>
      </div>
    </div>
  )
}
