'use client'

import { useInfiniteReviews } from '@/features/theme/hooks/useReviewsQuery'
import SButton from '@/components/button/SButton'
import FloatingActionButton from '@/components/button/FloatingActionButton'
import LoginPrompt from './LoginPrompt'
import ReviewItem from './ReviewItem'
import { ApiError } from '@/utils/api'
import { useQueryClient } from '@tanstack/react-query'

type ReviewListProps = {
  themeId: string
}

export default function ReviewList({ themeId }: ReviewListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteReviews(themeId)
  const queryClient = useQueryClient()

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

  const handleWriteReview = () => {
    // 리뷰 작성 화면으로 이동
  }

  return (
    <div className="relative min-h-[calc(100vh-112px-52px-16px-56px)]">
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
      <div className="fixed bottom-[72px] right-[16px] z-20">
        <FloatingActionButton text="리뷰 작성" onClick={handleWriteReview} />
      </div>
    </div>
  )
}
