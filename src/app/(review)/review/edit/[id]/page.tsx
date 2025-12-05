'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SHeader from '@/components/header/SHeader'
import ReviewForm, { type ReviewFormData } from '../../components/ReviewForm'
import type { Review } from '@/features/theme/api/getReviews.types'
import { getReviewDetail } from '@/features/theme/api/getReviewDetail'

export default function ReviewEditPage() {
  const router = useRouter()
  const params = useParams()
  const reviewId = params?.id as string
  const [review, setReview] = useState<Review | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setIsLoading(true)
        const reviewData = await getReviewDetail(reviewId)
        setReview(reviewData)
      } catch (error) {
        console.error('리뷰 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (reviewId) {
      fetchReview()
    }
  }, [reviewId])

  const handleSubmit = async (data: ReviewFormData) => {
    // TODO: 리뷰 수정 API 호출
    console.log('리뷰 수정 데이터:', data)

    // 수정 완료 후 이전 페이지로 이동
    router.back()
  }

  if (isLoading) {
    return (
      <>
        <SHeader title="리뷰 수정" showBack />
        <div className="flex items-center justify-center py-[40px]">
          <div className="text-14 text-gray05">로딩 중...</div>
        </div>
      </>
    )
  }

  if (!review) {
    return (
      <>
        <SHeader title="리뷰 수정" showBack />
        <div className="flex items-center justify-center py-[40px]">
          <div className="text-14 text-red-500">리뷰를 불러오지 못했습니다.</div>
        </div>
      </>
    )
  }

  return (
    <>
      <SHeader title="리뷰 수정" showBack />
      <ReviewForm
        initialData={{
          content: review.content,
          people: review.people,
          remainingTime: review.remainingTime,
          elapsedTime: review.elapsedTime,
          difficulty: review.difficulty,
          scareScore: review.scareScore,
          activityScore: review.activityScore,
          visitDate: review.visitDate,
          hints: review.hints,
          isSuccess: review.isSuccess,
        }}
        onSubmit={handleSubmit}
      />
    </>
  )
}
