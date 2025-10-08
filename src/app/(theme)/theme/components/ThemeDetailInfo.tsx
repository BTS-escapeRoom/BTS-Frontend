'use client'

import type { ThemeDetail as ThemeDetailType } from '@/features/theme/api/getThemeDetail.types'
import ThemeCommonInfo from './ThemeCommonInfo'
import SButton from '@/components/button/SButton'
import { useRouter } from 'next/navigation'

type ThemeDetailInfoProps = {
  theme: ThemeDetailType
}

export default function ThemeDetailInfo({ theme }: ThemeDetailInfoProps) {
  const router = useRouter()

  const handleReserve = () => {
    if (!theme.reservationUrl) return
    window.open(theme.reservationUrl, '_blank', 'noopener,noreferrer')
  }

  const handleRecruit = () => {
    // TODO: 임시 경로 - 추후 실제 모집글 작성 경로로 변경 예정
    router.push(`/board/recruit/new?themeId=${theme.id}`)
  }

  return (
    <div>
      <div className="space-y-[16px]">
        <ThemeCommonInfo theme={theme} />
        {theme.status ? (
          <div className="mt-[16px] flex w-full flex-col gap-[8px]">
            <SButton onClick={handleReserve}>바로 예약</SButton>
            <SButton
              onClick={handleRecruit}
              className="border border-[#7f1dff] bg-[#fff] text-[#7f1dff]"
            >
              모집하기
            </SButton>
          </div>
        ) : (
          <div className="mt-[16px] flex w-full flex-col gap-[8px]">
            <SButton disabled>이용 불가 테마</SButton>
          </div>
        )}
        <p className="text-[14px] text-gray05">{theme.description}</p>
      </div>
    </div>
  )
}
