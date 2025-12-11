'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ThemeList from './list/ThemeList'
import ThemeDetail from './detail/ThemeDetail'
import { useThemeDetail } from '@/features/theme'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'
import ScrollToTopButton from '@/components/button/ScrollToTopButton'

type TabKey = 'detail' | 'reservation' | 'review'

type ThemePageClientProps = {
  params: Omit<ThemeQueryParams, 'page'>
  initialThemeId?: string
  initialTab?: TabKey
}

export default function ThemePageClient({
  params,
  initialThemeId,
  initialTab = 'detail',
}: ThemePageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(initialThemeId || null)
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab)

  const { data: themeDetail, isLoading, error } = useThemeDetail(selectedThemeId)

  // URL 파라미터 변경 감지하여 모달 상태 업데이트
  useEffect(() => {
    const themeIdFromUrl = searchParams.get('themeId')
    const themeTabFromUrl = (searchParams.get('themeTab') as TabKey) || 'detail'

    if (themeIdFromUrl) {
      setSelectedThemeId(themeIdFromUrl)
      setIsModalOpen(true)
      setActiveTab(themeTabFromUrl)
    } else {
      setIsModalOpen(false)
      setSelectedThemeId(null)
    }
  }, [searchParams])

  const updateUrlParams = (themeId: string | null, tab: TabKey, replace = false) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (themeId) {
      newSearchParams.set('themeId', themeId)
      newSearchParams.set('themeTab', tab)
    } else {
      newSearchParams.delete('themeId')
      newSearchParams.delete('themeTab')
    }

    const url = `?${newSearchParams.toString()}`
    if (replace) {
      router.replace(url, { scroll: false })
    } else {
      router.push(url, { scroll: false })
    }
  }

  const handleThemeClick = (themeId: string) => {
    updateUrlParams(themeId, 'detail')
  }

  const handleCloseModal = () => {
    updateUrlParams(null, 'detail', true) // replace로 히스토리에 남기지 않음
  }

  const handleTabChange = (tab: TabKey) => {
    if (selectedThemeId) {
      updateUrlParams(selectedThemeId, tab, true) // tab 변경 시 replace로 처리
    }
  }

  return (
    <>
      <ThemeList params={params} onItemClick={handleThemeClick} />
      <ScrollToTopButton />

      {isModalOpen && selectedThemeId ? (
        <ThemeDetail
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialTab={activeTab}
          onTabChange={handleTabChange}
          isLoading={isLoading}
          error={error}
          themeDetail={themeDetail}
        />
      ) : null}
    </>
  )
}
