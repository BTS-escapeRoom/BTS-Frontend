'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import HeaderController from '@/components/header/HeaderController'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useModalStore } from '@/store/modalStore'
import ConfirmModalContent from '@/components/modal/ConfirmModalContent'

export default function MyEscapePage() {
  const router = useRouter()
  const memberInfo = useAuthStore((state) => state.memberInfo)
  const logout = useAuthStore((state) => state.logout)
  const { openModal } = useModalStore()

  const profileImage = memberInfo?.profileImg || '/images/default-profile.png'
  const nickname = memberInfo?.nickname || ''

  const handleLogout = () => {
    openModal(
      <ConfirmModalContent
        title="로그인"
        message="로그아웃 하시겠습니까?"
        onConfirm={async () => {
          await logout()
          router.push('/')
        }}
        confirmText="로그아웃"
        cancelText="취소"
      />,
      {
        title: '로그인',
      },
    )
  }

  return (
    <>
      <HeaderController />
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center px-4 py-4">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={profileImage}
              alt="프로필"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <span className="ml-4 text-14 font-bold text-gray07">{nickname}</span>
        </div>

        <div className="mt-4 flex flex-col px-4">
          {/* 방탈출 기록 - 타이틀만 */}
          <div className="text-14 font-bold text-gray07">방탈출 기록</div>

          {/* 나의 활동 - 타이틀만 */}
          <div className="mt-4 text-14 font-bold text-gray07">나의 활동</div>

          {/* 내가 쓴 리뷰 */}
          <button className="py-[18px] text-left text-14 font-bold text-gray07">내가 쓴 리뷰</button>

          {/* 문의하기 */}
          <button className="py-[18px] text-left text-14 font-bold text-gray07">문의하기</button>

          {/* 공지사항 */}
          <button className="py-[18px] text-left text-14 font-bold text-gray07">공지사항</button>

          {/* 로그아웃 */}
          <button
            onClick={handleLogout}
            className="py-[18px] text-left text-14 font-bold text-gray07"
          >
            로그아웃
          </button>

          {/* 서비스 설정 */}
          <button className="py-[18px] text-left text-14 font-bold text-gray07">서비스 설정</button>
        </div>
      </div>
    </>
  )
}
