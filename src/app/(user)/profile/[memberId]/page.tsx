'use client'

import { use } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import SHeader from '@/components/header/SHeader'
import { getReviewHistory } from '@/features/theme/api/getReviewHistory'
import EscapeRecordCard from '@/app/(user)/my/components/EscapeRecordCard'

type UserProfilePageProps = {
  params: Promise<{
    memberId: string
  }>
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { memberId } = use(params)
  const memberIdNumber = Number(memberId)
  const searchParams = useSearchParams()

  const nicknameFromQuery = searchParams.get('nickname')
  const profileImgFromQuery = searchParams.get('profileImg')

  const { data: records, isLoading } = useQuery({
    queryKey: ['reviewHistory', memberIdNumber],
    queryFn: () => getReviewHistory(memberIdNumber),
    enabled: Number.isFinite(memberIdNumber),
  })

  const profileImage = profileImgFromQuery || '/images/default-profile.png'
  const nickname = nicknameFromQuery || ''

  const totalCount = records?.length ?? 0
  const successCount = records?.filter((record) => record.isSuccess)?.length ?? 0
  const hasRecords = totalCount > 0

  return (
    <>
      <SHeader showBack />
      <div className="flex h-full w-full flex-col">
        {/* 프로필 영역 (My 페이지와 동일한 UI) */}
        <div className="flex items-center px-4 py-4">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={profileImage} alt="프로필" fill className="object-cover" sizes="48px" />
          </div>
          <span className="ml-4 text-14 font-bold text-gray07">{nickname}</span>
        </div>

        {/* 방탈출 기록 영역 */}
        <div className="mt-4 flex flex-col px-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="text-14 font-bold text-gray07">방탈출 기록</div>
            <div className="text-12 text-gray07">
              {isLoading
                ? '기록을 불러오는 중...'
                : `${totalCount}개의 기록 중 성공 기록: ${successCount}개`}
            </div>
          </div>

          <div className="mt-[8px]">
            {isLoading ? (
              <div className="flex h-[68px] items-center justify-center text-14 text-gray04">
                기록을 불러오는 중...
              </div>
            ) : !hasRecords ? (
              <div className="flex h-[68px] items-center justify-center text-14 text-gray04">
                아직 방탈출 기록이 없어요.
              </div>
            ) : (
              <div className="grid grid-cols-2 justify-items-center gap-[16px]">
                {records?.map((record) => (
                  <EscapeRecordCard key={record.reviewId} record={record} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
