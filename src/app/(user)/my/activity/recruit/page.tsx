'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import RecruitBoardCard from '@/app/(community)/board/recruit/components/list/RecruitBoardCard'
import { useInfiniteMyBoards, type MyBoardType } from '@/features/board'
import QueryProvider from '@/app/(theme)/theme/components/QueryProvider'
import { Suspense } from 'react'

type TabType = 'my' | 'commented' | 'liked'

const tabs: { id: TabType; label: string; apiType: MyBoardType }[] = [
  { id: 'my', label: '나의 게시글', apiType: 'my' },
  { id: 'commented', label: '댓글 단 글', apiType: 'commented' },
  { id: 'liked', label: '관심 글', apiType: 'liked' },
]

function ActivityTabButton({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-center text-14 transition-colors ${
        isActive ? 'border-b-2 border-gray05 font-bold text-gray06' : 'text-gray04'
      }`}
    >
      {label}
    </button>
  )
}

function EmptyActivityState({
  message,
  buttonText,
  onButtonClick,
}: {
  message: string
  buttonText: string
  onButtonClick: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-8">
      <p className="mb-6 text-center text-14 font-semibold text-gray04">{message}</p>
      <button
        onClick={onButtonClick}
        className="rounded-[2px] bg-gray06 px-4 py-1.5 text-center text-14 text-gray01"
      >
        {buttonText}
      </button>
    </div>
  )
}

function MyActivityList({
  type,
  onItemClick,
  emptyMessage,
  onEmptyButtonClick,
}: {
  type: MyBoardType
  onItemClick?: (boardId: number) => void
  emptyMessage: string
  onEmptyButtonClick: () => void
}) {
  const { data, isLoading, isError, error } = useInfiniteMyBoards(type)

  const boards = data?.pages[0]?.boards ?? []

  if (isLoading) {
    return (
      <div className="space-y-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-gray02 bg-white px-4 py-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray02" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray02" />
            <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray02" />
            <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-gray02" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="px-6 py-8 text-center text-14 text-red-500">
        게시글을 불러오는 중 오류가 발생했습니다. {(error as Error)?.message}
      </div>
    )
  }

  if (boards.length === 0) {
    return (
      <EmptyActivityState
        message={emptyMessage}
        buttonText="모집게시판 둘러보기"
        onButtonClick={onEmptyButtonClick}
      />
    )
  }

  return (
    <div className="space-y-0">
      {boards.map((board, index) => (
        <RecruitBoardCard
          key={board.id}
          board={board}
          onClick={onItemClick}
          isLast={index === boards.length - 1}
        />
      ))}
    </div>
  )
}

function MyActivityContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('my')
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsAtTop(scrollTop === 0)
    }

    // 초기 상태 확인
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab)!

  const handleBoardClick = (boardId: number) => {
    router.push(`/board/recruit/${boardId}`)
  }

  const handleEmptyButtonClick = () => {
    router.push('/board/recruit')
  }

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId)
  }

  const getEmptyMessage = (tabId: TabType) => {
    switch (tabId) {
      case 'my':
        return '아직 게시글이 없어요.'
      case 'commented':
        return '아직 댓글단 글이 없어요.'
      case 'liked':
        return '아직 관심글이 없어요.'
      default:
        return '게시글이 없습니다.'
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* 헤더 */}
      <SHeader title="나의 활동 - 모집게시판" showBack />

      {/* 탭 영역 - 고정 */}
      <div
        className={`${
          isAtTop ? 'relative' : 'sticky top-[52px] z-10'
        } border-b border-gray02 bg-white`}
      >
        <div className="flex">
          {tabs.map((tab) => (
            <ActivityTabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* 목록 영역 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'commented' ? (
          <EmptyActivityState
            message="아직 댓글단 글이 없어요."
            buttonText="모집게시판 둘러보기"
            onButtonClick={handleEmptyButtonClick}
          />
        ) : (
          <MyActivityList
            type={activeTabInfo.apiType}
            onItemClick={handleBoardClick}
            emptyMessage={getEmptyMessage(activeTab)}
            onEmptyButtonClick={handleEmptyButtonClick}
          />
        )}
      </div>
    </div>
  )
}

export default function MyActivityPage() {
  return (
    <QueryProvider>
      <Suspense fallback={<div className="flex h-full w-full flex-col">로딩 중...</div>}>
        <MyActivityContent />
      </Suspense>
    </QueryProvider>
  )
}
