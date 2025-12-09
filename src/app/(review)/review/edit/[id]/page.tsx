'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SHeader from '@/components/header/SHeader'
import ReviewForm, { type ReviewFormData } from '../../components/ReviewForm'
import type { Review } from '@/features/theme/api/getReviews.types'
import { getReviewDetail } from '@/features/theme/api/getReviewDetail'
import { updateReview } from '@/features/theme/api/updateReview'
import { useToast } from '@/hooks/useToast'

export default function ReviewEditPage() {
  const router = useRouter()
  const params = useParams()
  const reviewId = params?.id as string
  const [review, setReview] = useState<Review | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    try {
      // visitDate에 시간 추가 (YYYY-MM-DD -> YYYY-MM-DDTHH:mm:ss ISO 8601 형식)
      const visitDateWithTime = data.visitDate ? `${data.visitDate}T00:00:00` : undefined

      await updateReview(reviewId, {
        content: data.content || undefined,
        people: data.people || undefined,
        remainingTime: data.remainingTime || undefined,
        elapsedTime: data.elapsedTime || undefined,
        difficulty: data.difficulty,
        scareScore: data.scareScore,
        activityScore: data.activityScore,
        visitDate: visitDateWithTime,
        hints: data.hints || undefined,
        isSuccess: data.isSuccess!,
      })

      showToast('리뷰가 수정되었습니다.', 'success')
      router.back()
    } catch (error) {
      showToast('리뷰 수정 중 오류가 발생했습니다.', 'error')
    } finally {
      setIsSubmitting(false)
    }
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
          timeType: review.timeType,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
