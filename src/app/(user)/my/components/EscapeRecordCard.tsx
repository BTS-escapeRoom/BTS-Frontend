'use client'

import Image from 'next/image'
import type { ReviewHistory } from '@/features/theme/api/getReviewHistory.types'

function formatTime(seconds: number | null | undefined): string {
  // time 정보가 없으면 '-'
  if (seconds == null) return '-'

  // 초 단위를 HH:MM:SS로 변환
  const sec = Math.max(0, seconds)
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60

  const pad = (v: number) => v.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

interface EscapeRecordCardProps {
  record: ReviewHistory
}

export default function EscapeRecordCard({ record }: EscapeRecordCardProps) {
  const isSuccess = record.isSuccess ?? false

  const backgroundSrc = isSuccess ? '/images/ticket-dark.png' : '/images/ticket-light.png'
  const themeTextColor = isSuccess ? 'text-white' : 'text-gray05'
  const timeTextColor = isSuccess ? 'text-[#85FF93]' : 'text-[#FF2DB9]'

  return (
    <div className="h-[68px] w-[156px] flex-shrink-0">
      <div className="relative h-full w-full">
        <Image
          src={backgroundSrc}
          alt={isSuccess ? '탈출 성공 티켓' : '탈출 실패 티켓'}
          fill
          className="object-contain"
          sizes="156px"
        />
        <div className="absolute inset-0 px-4 py-[14px]">
          <div className="flex h-full flex-col items-center justify-center gap-[12px]">
            <div className={`text-14 font-bold leading-[100%] ${themeTextColor} line-clamp-1`}>
              {record.themeTitle}
            </div>
            <div
              className={`text-14 leading-[100%] ${timeTextColor}`}
              style={{ fontFamily: 'var(--font-galmuri)' }}
            >
              {formatTime(record.time)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
