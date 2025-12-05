'use client'

import { useState } from 'react'
import ThemeList from './list/ThemeList'
import ThemeDetail from './detail/ThemeDetail'
import { useThemeDetail } from '@/features/theme'
import type { ThemeQueryParams } from '@/features/theme/api/getThemes.types'
import ScrollToTopButton from '@/components/button/ScrollToTopButton'

type ThemePageClientProps = {
  params: Omit<ThemeQueryParams, 'page'>
}

export default function ThemePageClient({ params }: ThemePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'detail' | 'reservation' | 'review'>('detail')

  const { data: themeDetail, isLoading, error } = useThemeDetail(selectedThemeId)

  const handleThemeClick = (themeId: string) => {
    setSelectedThemeId(themeId)
    setIsModalOpen(true)
    setActiveTab('detail')
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedThemeId(null)
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
          onTabChange={setActiveTab}
          isLoading={isLoading}
          error={error}
          themeDetail={themeDetail}
        />
      ) : null}
    </>
  )
}
