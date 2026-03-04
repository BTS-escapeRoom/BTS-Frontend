'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SHeader from '@/components/header/SHeader'
import ConfirmModalContent from '@/components/modal/ConfirmModalContent'
import { useModalStore } from '@/store/modalStore'
import { deleteMember } from '@/features/auth/api/member'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useToast } from '@/hooks/useToast'

export default function SettingsPage() {
  const { openModal } = useModalStore()
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()
  const { showToast } = useToast()

  const handleWithdraw = async () => {
    try {
      await deleteMember()
      await logout()
      router.push('/')
    } catch {
      showToast('탈퇴 처리 중 오류가 발생했습니다.', 'error')
    }
  }

  const handleOpenWithdrawModal = () => {
    openModal(
      <ConfirmModalContent
        title="탈퇴하기"
        message="정말 탈퇴하시겠습니까?"
        onConfirm={() => {
          void handleWithdraw()
        }}
        confirmText="탈퇴하기"
        cancelText="취소"
        confirmFirst
        confirmButtonClassName="bg-[#E4626F] text-white"
      />,
      {
        title: '탈퇴하기',
      },
    )
  }

  return (
    <div className="flex h-full w-full flex-col">
      <SHeader title="설정" showBack />

      <div className="mt-[16px] flex flex-col gap-[8px] px-[16px]">
        <Link href="/my/settings/profile" className="w-full px-0 py-[18px] text-14 text-gray07">
          프로필 편집
        </Link>
        <Link href="/my/settings/account" className="w-full px-0 py-[18px] text-14 text-gray07">
          계정 정보
        </Link>
        <Link href="/my/settings/terms" className="w-full px-0 py-[18px] text-14 text-gray07">
          이용 약관
        </Link>
        <button
          type="button"
          onClick={handleOpenWithdrawModal}
          className="w-full px-0 py-[18px] text-left text-14 text-[#E4626F]"
        >
          탈퇴하기
        </button>
      </div>
    </div>
  )
}
