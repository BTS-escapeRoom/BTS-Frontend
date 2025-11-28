'use client'

import type { Review } from '@/features/theme/api/getReviews.types'

type ReviewItemProps = {
  review: Review
}

export default function ReviewItem({ review }: ReviewItemProps) {
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
