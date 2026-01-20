'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth/store/authStore'
import { getReviewHistory } from '@/features/theme/api/getReviewHistory'
import EscapeRecordCard from './EscapeRecordCard'

export default function EscapeRecordList() {
  const router = useRouter()
  const memberInfo = useAuthStore((state) => state.memberInfo)
  const memberId = memberInfo?.id

  const { data: records, isLoading } = useQuery({
    queryKey: ['reviewHistory', memberId],
    queryFn: () => getReviewHistory(memberId as number),
    enabled: !!memberId,
  })

  const hasRecords = useMemo(() => (records?.length ?? 0) > 0, [records])

  if (!memberId || isLoading) {
    // 로딩 상태에서는 기존의 빈 상태 문구만 노출
    return (
      <>
        <div className="text-14 font-bold text-gray07">방탈출 기록</div>

        <div className="mt-[8px] h-[68px]">
          <div className="flex h-full items-center justify-center text-14 text-gray04">
            <span>리뷰를 남기면 방탈출 기록이 추가돼요.</span>
          </div>
        </div>
      </>
    )
  }

  if (!hasRecords) {
    return (
      <>
        <div className="text-14 font-bold text-gray07">방탈출 기록</div>
        <div className="mt-[8px] h-[68px]">
          <div className="flex h-full items-center justify-center text-14 text-gray04">
            <span>리뷰를 남기면 방탈출 기록이 추가돼요.</span>
          </div>
        </div>
      </>
    )
  }

  const handleMoreClick = () => {
    if (!memberId) return

    const searchParams = new URLSearchParams()
    if (memberInfo?.nickname) {
      searchParams.set('nickname', memberInfo.nickname)
    }
    if (memberInfo?.profileImg) {
      searchParams.set('profileImg', memberInfo.profileImg)
    }

    const queryString = searchParams.toString()
    const path = `/profile/${memberId}${queryString ? `?${queryString}` : ''}`

    router.push(path)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-14 font-bold text-gray07">방탈출 기록</div>
        <button type="button" onClick={handleMoreClick} className="text-12 text-gray07">
          더보기
        </button>
      </div>
      <div className="mt-[8px]">
        <div className="scrollbar-hide mr-[-16px] flex gap-2 overflow-x-auto pr-4">
          {records
            ?.slice(0, 8)
            .map((record) => <EscapeRecordCard key={record.reviewId} record={record} />)}
        </div>
      </div>
    </>
  )
}
