'use client'

import { use, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import QueryProvider from '@/app/(theme)/theme/components/QueryProvider'
import { useBoardDetail } from '@/features/board/hooks/useBoardsQuery'
import { useThemeDetail } from '@/features/theme/hooks/useThemeQuery'
import ThemeDetail from '@/app/(theme)/theme/components/detail/ThemeDetail'
import RecruitBoardPost from './components/RecruitBoardPost'
import RecruitBoardComments from './components/RecruitBoardComments'

type TabKey = 'detail' | 'reservation' | 'review'

type RecruitBoardDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

function RecruitBoardDetailContent({ params }: RecruitBoardDetailPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { id } = use(params)
  const { data: board, isLoading, error } = useBoardDetail(id)

  // 테마 상세 모달 상태 관리
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('detail')

  const {
    data: themeDetail,
    isLoading: isThemeLoading,
    error: themeError,
  } = useThemeDetail(selectedThemeId)

  // URL 파라미터 변경 감지하여 모달 상태 업데이트
  useEffect(() => {
    const themeIdFromUrl = searchParams.get('themeId')
    const themeTabFromUrl = (searchParams.get('themeTab') as TabKey) || 'detail'

    if (themeIdFromUrl) {
      setSelectedThemeId(themeIdFromUrl)
      setIsThemeModalOpen(true)
      setActiveTab(themeTabFromUrl)
    } else {
      setIsThemeModalOpen(false)
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

    const url = `/board/recruit/${id}?${newSearchParams.toString()}`
    if (replace) {
      router.replace(url, { scroll: false })
    } else {
      router.push(url, { scroll: false })
    }
  }

  const handleCloseThemeModal = () => {
    updateUrlParams(null, 'detail', true) // replace로 히스토리에 남기지 않음
  }

  const handleThemeTabChange = (tab: TabKey) => {
    if (selectedThemeId) {
      updateUrlParams(selectedThemeId, tab)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col">
        <SHeader title="모집 게시판" showBack />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-14 text-gray05">게시글을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !board) {
    return (
      <div className="flex h-full w-full flex-col">
        <SHeader title="모집 게시판" showBack />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-14 text-gray05">게시글을 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <SHeader title="모집 게시판" showBack />
        <div className="flex-1 overflow-y-auto">
          {/* 모집 게시글 정보 영역 */}
          <RecruitBoardPost board={board} />

          {/* 댓글 영역 */}
          <RecruitBoardComments boardId={board.id} commentCount={board.commentCount} />
        </div>
      </div>

      {/* 테마 상세 모달 */}
      {isThemeModalOpen && selectedThemeId && (
        <ThemeDetail
          isOpen={isThemeModalOpen}
          onClose={handleCloseThemeModal}
          initialTab={activeTab}
          onTabChange={handleThemeTabChange}
          isLoading={isThemeLoading}
          error={themeError}
          themeDetail={themeDetail}
        />
      )}
    </>
  )
}

export default function RecruitBoardDetailPage({ params }: RecruitBoardDetailPageProps) {
  return (
    <QueryProvider>
      <RecruitBoardDetailContent params={params} />
    </QueryProvider>
  )
}
