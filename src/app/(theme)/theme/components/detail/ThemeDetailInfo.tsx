'use client'

import type { ThemeDetail as ThemeDetailType } from '@/features/theme/api/getThemeDetail.types'
import ThemeCommonInfo from './ThemeCommonInfo'
import SButton from '@/components/button/SButton'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth'
import { useModalStore } from '@/store/modalStore'
import ConfirmModalContent from '@/components/modal/ConfirmModalContent'

type ThemeDetailInfoProps = {
  theme: ThemeDetailType
}

export default function ThemeDetailInfo({ theme }: ThemeDetailInfoProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const { openModal } = useModalStore()

  const handleReserve = () => {
    if (!theme.reservationUrl) return
    window.open(theme.reservationUrl, '_blank', 'noopener,noreferrer')
  }

  const handleRecruit = () => {
    if (isLoading) return

    if (!isAuthenticated) {
      openModal(
        <ConfirmModalContent
          title="로그인이 필요해요 🚪"
          message={'이 기능은 로그인 후 이용할 수 있어요.\n지금 로그인하고 모집글을 작성할까요? 🔑'}
          onConfirm={() => {
            router.push('/login')
          }}
          confirmText="로그인 하러 가기"
          cancelText="닫기"
        />,
        {
          title: '로그인이 필요해요 🚪',
        },
      )
      return
    }

    router.push(`/board/recruit/write?themeId=${theme.id}`)
  }

  return (
    <div>
      <div className="space-y-[16px]">
        <ThemeCommonInfo theme={theme} />
        {theme.status ? (
          <div className="mt-[16px] flex w-full flex-col gap-[8px]">
            <SButton onClick={handleReserve}>바로 예약</SButton>
            <SButton
              onClick={handleRecruit}
              className="border border-[#7f1dff] bg-[#fff] text-[#7f1dff]"
            >
              모집하기
            </SButton>
          </div>
        ) : (
          <div className="mt-[16px] flex w-full flex-col gap-[8px]">
            <SButton disabled>이용 불가 테마</SButton>
          </div>
        )}
        <p className="text-[14px] text-gray05">{theme.description}</p>
      </div>
    </div>
  )
}
