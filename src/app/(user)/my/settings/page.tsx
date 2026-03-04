'use client'

import Link from 'next/link'
import SHeader from '@/components/header/SHeader'
import ConfirmModalContent from '@/components/modal/ConfirmModalContent'
import { useModalStore } from '@/store/modalStore'

export default function SettingsPage() {
  const { openModal } = useModalStore()

  const handleOpenWithdrawModal = () => {
    openModal(
      <ConfirmModalContent
        title="탈퇴하기"
        message="탈퇴 기능은 준비 중입니다."
        onConfirm={() => {}}
        confirmText="확인"
        cancelText="취소"
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
