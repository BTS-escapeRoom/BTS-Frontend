'use client'

import type { ThemeDetail as ThemeDetailType } from '@/features/theme/api/getThemeDetail.types'
import ThemeCommonInfo from './ThemeCommonInfo'
import SButton from '@/components/button/SButton'

type ThemeReservationInfoProps = {
  theme: ThemeDetailType
}

export default function ThemeReservationInfo({ theme }: ThemeReservationInfoProps) {
  const handleReserve = () => {
    if (!theme.reservationUrl) return
    window.open(theme.reservationUrl, '_blank', 'noopener,noreferrer')
  }
  return (
    <div>
      <div className="space-y-[12px] pb-[24px]">
        <ThemeCommonInfo theme={theme} />

        <div>
          <div className="mt-[12px]">
            <div className="text-semibold-14 text-[#000]">{theme.store.name}</div>
            <div className="mt-[2px] text-[12px] text-gray05">{theme.store.location}</div>
          </div>
          <div className="mt-[12px]">
            <div className="text-semibold-14 text-[#000]">가격 정보</div>
            <div className="mt-[2px] text-[12px] text-gray05">₩ {theme.price.toLocaleString()}</div>
          </div>

          <div className="mt-[12px] w-full">
            <div className="text-semibold-14 text-[#000]">예약 시간표</div>
            <ul className="scrollbar-hide mt-[2px] flex flex-nowrap gap-[6px] overflow-x-auto pb-[8px]">
              {theme.weekdaysTimeList.map((t) => (
                <li
                  key={t.id}
                  className="rounded-xl border border-gray03 px-[6px] text-[12px] text-gray05"
                >
                  {t.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {!theme.status && (
        <div className="sticky bottom-[56px] left-0 right-0 bg-white pb-[16px]">
          <SButton onClick={handleReserve}>바로 예약</SButton>
        </div>
      )}
    </div>
  )
}
