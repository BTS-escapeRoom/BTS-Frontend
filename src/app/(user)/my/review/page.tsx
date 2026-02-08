'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { use, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import QueryProvider from '@/app/(theme)/theme/components/QueryProvider'
import { getMyReviews } from '@/features/theme/api/getMyReviews'
import ThemeInfoButton from '@/app/(community)/board/recruit/[id]/components/ThemeInfoButton'
import ReviewItem from '@/app/(theme)/theme/components/detail/ReviewItem'
import ThemeDetail from '@/app/(theme)/theme/components/detail/ThemeDetail'
import { useThemeDetail } from '@/features/theme/hooks/useThemeQuery'
import type { Review } from '@/features/theme/api/getReviews.types'
import type { MyReview } from '@/features/theme/api/getMyReviews.types'
import SButton from '@/components/button/SButton'

type TabKey = 'detail' | 'reservation' | 'review'

// MyReview를 Review 타입으로 변환
function convertMyReviewToReview(myReview: MyReview): Review {
  return {
    id: myReview.id,
    content: myReview.content,
    people: myReview.people,
    remainingTime: myReview.remainingTime,
    elapsedTime: myReview.elapsedTime,
    timeType: myReview.timeType,
    difficulty: myReview.difficulty,
    scareScore: myReview.scareScore,
    activityScore: myReview.activityScore,
    visitDate: myReview.visitDate,
    hints: myReview.hints,
    isSuccess: myReview.isSuccess,
    createdAt: myReview.createdAt,
    isMyReview: myReview.isMyReview,
    nickname: myReview.nickname,
  }
}

function MyReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['myReviews'],
    queryFn: getMyReviews,
  })

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

    const url = `/my/review?${newSearchParams.toString()}`
    if (replace) {
      router.replace(url, { scroll: false })
    } else {
      router.push(url, { scroll: false })
    }
  }

  const handleThemeClick = (themeId: string) => {
    updateUrlParams(themeId, 'detail', false)
  }

  const handleCloseThemeModal = () => {
    updateUrlParams(null, 'detail', true) // replace로 히스토리에 남기지 않음
  }

  const handleThemeTabChange = (tab: TabKey) => {
    if (selectedThemeId) {
      // 탭 이동 시에는 히스토리에 남기지 않도록 replace 사용
      updateUrlParams(selectedThemeId, tab, true)
    }
  }

  const handleDeleteSuccess = () => {
    // 리뷰 삭제 후 목록 갱신
    queryClient.invalidateQueries({ queryKey: ['myReviews'] })
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col">
        <SHeader title="내가 쓴 리뷰" showBack />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-14 text-gray05">리뷰를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col">
        <SHeader title="내가 쓴 리뷰" showBack />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-14 text-gray05">리뷰를 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  const handleBrowseThemes = () => {
    router.push('/theme')
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex h-full w-full flex-col">
        <SHeader title="내가 쓴 리뷰" showBack />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="whitespace-pre-line text-center text-14 font-semibold text-gray04">
              작성한 리뷰가 없어요.{'\n'}다른 사람들과 방탈출 후기를 공유해보세요.
            </div>
            <SButton
              onClick={handleBrowseThemes}
              size="sm"
              className="h-[24px] w-[93px] rounded-[2px] bg-gray06 text-14 font-normal text-[#FAFAFA]"
            >
              테마 둘러보기
            </SButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <SHeader title="내가 쓴 리뷰" showBack />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`flex flex-col gap-4 border-b border-gray02 ${index < reviews.length - 1 ? 'mb-6' : ''}`}
            >
              {/* 테마 정보 버튼 */}
              {review.theme && (
                <ThemeInfoButton
                  theme={review.theme}
                  onClick={() => handleThemeClick(review.theme!.id.toString())}
                />
              )}

              {/* 리뷰 아이템 */}
              <ReviewItem
                review={convertMyReviewToReview(review)}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </div>
          ))}
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

type MyReviewPageProps = {
  params: Promise<Record<string, never>>
}

export default function MyReviewPage({ params }: MyReviewPageProps) {
  use(params) // params를 사용하여 Promise를 unwrap
  return (
    <QueryProvider>
      <MyReviewContent />
    </QueryProvider>
  )
}
