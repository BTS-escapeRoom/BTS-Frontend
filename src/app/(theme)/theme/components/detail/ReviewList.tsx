'use client'

import { useRouter } from 'next/navigation'
import { useInfiniteReviews } from '@/features/theme/hooks/useReviewsQuery'
import SButton from '@/components/button/SButton'
import FloatingActionButton from '@/components/button/FloatingActionButton'
import LoginPrompt from './LoginPrompt'
import ReviewItem from './ReviewItem'
import { ApiError } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'
import { getReviewAvailable } from '@/features/theme/api/getReviewAvailable'
import { useToast } from '@/hooks/useToast'

type ReviewListProps = {
  themeId: string
}

export default function ReviewList({ themeId }: ReviewListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteReviews(themeId)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { showToast } = useToast()

  const handleDeleteSuccess = () => {
    // 리뷰 목록 쿼리 무효화하여 다시 불러오기
    queryClient.invalidateQueries({ queryKey: ['reviews', themeId] })
  }

  // 401 에러(로그인 필요)인 경우 로그인 프롬프트 표시
  if (error instanceof ApiError && error.status === 401) {
    return <LoginPrompt />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-[40px]">
        <div className="text-14 text-red-500">리뷰를 불러오지 못했습니다.</div>
      </div>
    )
  }

  const reviews = data?.pages.flat() ?? []

  const handleWriteReview = async () => {
    try {
      const result = await getReviewAvailable(themeId)

      if (result.isAvailable) {
        // 리뷰 작성 가능한 경우 작성 페이지로 이동
        router.push(`/review/write?themeId=${themeId}`)
      } else {
        // 리뷰 작성 불가능한 경우 경고 토스트 표시
        showToast('이미 최근에 리뷰를 작성하셨습니다.', 'warning')
      }
    } catch (error) {
      console.error('리뷰 작성 가능 여부 조회 실패:', error)
      showToast('리뷰 작성 가능 여부를 확인하는 중 오류가 발생했습니다.', 'error')
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-112px-52px-16px-56px)] pb-[36px]">
      {reviews.length === 0 ? (
        <div className="flex min-h-[calc(100vh-112px-52px-16px-56px)] flex-col items-center justify-center">
          <div className="text-center text-14 text-gray05">
            <div>아직 작성된 리뷰가 없어요.</div>
            <div>첫번째 리뷰의 주인공이 되어보세요!</div>
          </div>
        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} onDeleteSuccess={handleDeleteSuccess} />
          ))}

          {hasNextPage && (
            <div className="mt-[24px]">
              <SButton
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="text-gray08 bg-gray06 hover:bg-gray05 disabled:bg-gray04"
              >
                {isFetchingNextPage ? '로딩 중...' : '리뷰 더보기'}
              </SButton>
            </div>
          )}
        </>
      )}

      {/* 리뷰 작성 버튼 - 항상 우측 하단에 고정 (네비게이션 높이 고려) */}
      <div className="fixed bottom-[72px] left-1/2 w-full max-w-[600px] -translate-x-1/2 px-[16px]">
        <div className="flex justify-end">
          <FloatingActionButton text="리뷰 작성" onClick={handleWriteReview} />
        </div>
      </div>
    </div>
  )
}
