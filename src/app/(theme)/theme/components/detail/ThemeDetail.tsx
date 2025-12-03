'use client'

import { useState } from 'react'
import ThemeDetailTabs from './ThemeDetailTabs'
import { BottomSheetModal } from '@/components/modal'
import type { ThemeDetail as ThemeDetailType } from '@/features/theme/api/getThemeDetail.types'
import ThemeDetailInfo from './ThemeDetailInfo'
import ThemeReservationInfo from './ThemeReservationInfo'
import ReviewList from './ReviewList'

type TabKey = 'detail' | 'reservation' | 'review'

type ThemeDetailProps = {
  isOpen: boolean
  onClose: () => void
  initialTab?: TabKey
  onTabChange?: (key: TabKey) => void
  isLoading?: boolean
  error?: unknown
  themeDetail?: ThemeDetailType
}

export default function ThemeDetail({
  isOpen,
  onClose,
  initialTab = 'detail',
  onTabChange,
  isLoading,
  error,
  themeDetail,
}: ThemeDetailProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab)

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key)
    onTabChange?.(key)
  }
  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} className="h-[calc(100vh-112px)] bg-white">
      <div className="sticky top-0 z-10 rounded-t-xl bg-white">
        <ThemeDetailTabs initial={initialTab} onChange={handleTabChange} />
      </div>
      <div className="p-[16px] pb-[56px]">
        {isLoading && (
          <div className="flex items-center justify-center py-[40px]">
            <div className="text-[14px] text-gray-500">로딩 중...</div>
          </div>
        )}

        {!isLoading && Boolean(error) && (
          <div className="flex items-center justify-center py-[40px]">
            <div className="text-[14px] text-red-500">데이터를 불러오지 못했습니다.</div>
          </div>
        )}

        {!isLoading && !error && themeDetail && (
          <>
            {activeTab === 'detail' && <ThemeDetailInfo theme={themeDetail} />}
            {activeTab === 'reservation' && <ThemeReservationInfo theme={themeDetail} />}
            {activeTab === 'review' && <ReviewList themeId={themeDetail.id.toString()} />}
          </>
        )}
      </div>
    </BottomSheetModal>
  )
}
