'use client'

import { useInfiniteReviews } from '@/features/theme/hooks/useReviewsQuery'
import { useAuth } from '@/features/auth'
import SButton from '@/components/button/SButton'
import LoginPrompt from './LoginPrompt'
import type { Review } from '@/features/theme/api/getReviews.types'

type ReviewListProps = {
  themeId: string
}

function ReviewItem({ review }: { review: Review }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="mb-[16px] border-b border-gray03 pb-[16px] last:mb-0 last:border-b-0">
      <div className="mb-[8px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <span className="text-gray08 text-14 font-semibold">{review.nickname}</span>
          {review.isMyReview && (
            <span className="bg-primary rounded-sm px-[6px] py-[2px] text-12 text-white">
              내 리뷰
            </span>
          )}
        </div>
        <span className="text-12 text-gray05">{formatDate(review.createdAt)}</span>
      </div>

      <div className="mb-[8px]">
        <div className="flex items-center gap-[12px] text-12 text-gray06">
          <span>인원: {review.people}명</span>
          <span>소요시간: {review.time}분</span>
          <span>난이도: {review.difficulty}/5</span>
        </div>
      </div>

      <div className="mb-[8px]">
        <div className="flex items-center gap-[12px] text-12 text-gray06">
          <span>공포도: {review.scareScore}/5</span>
          <span>활동성: {review.activityScore}/5</span>
          <span>힌트: {review.hints}개</span>
          <span className={review.isSuccess ? 'text-green-600' : 'text-red-500'}>
            {review.isSuccess ? '성공' : '실패'}
          </span>
        </div>
      </div>

      <div className="text-gray08 text-14 leading-relaxed">{review.content}</div>

      <div className="mt-[8px] text-12 text-gray05">방문일: {formatDate(review.visitDate)}</div>
    </div>
  )
}

export default function ReviewList({ themeId }: ReviewListProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteReviews(themeId, isAuthenticated)

  // 인증 상태 로딩 중
  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-[40px]">
        <div className="text-14 text-gray05">로딩 중...</div>
      </div>
    )
  }

  // 로그인하지 않은 경우
  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-[40px]">
        <div className="text-14 text-gray05">리뷰를 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-[40px]">
        <div className="text-14 text-red-500">리뷰를 불러오지 못했습니다.</div>
      </div>
    )
  }

  const reviews = data?.pages.flat() ?? []

  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-[40px]">
        <div className="text-14 text-gray05">아직 등록된 리뷰가 없습니다.</div>
      </div>
    )
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
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
    </div>
  )
}
