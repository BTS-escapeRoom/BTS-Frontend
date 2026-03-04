'use client'

import SHeader from '@/components/header/SHeader'
import { useAuthStore } from '@/features/auth/store/authStore'

const socialTypeLabel: Record<string, string> = {
  KAKAO: '카카오',
  NAVER: '네이버',
  APPLE: '애플',
}

export default function AccountInfoPage() {
  const memberInfo = useAuthStore((state) => state.memberInfo)

  const infoRows = [
    { label: '회원 번호', value: memberInfo?.id ? String(memberInfo.id) : '-' },
    { label: '닉네임', value: memberInfo?.nickname || '-' },
    {
      label: '연동 계정',
      value: memberInfo?.socialType
        ? socialTypeLabel[memberInfo.socialType] || memberInfo.socialType
        : '-',
    },
    { label: '권한', value: memberInfo?.role === 'Role.ROLE_ADMIN' ? '관리자' : '일반 회원' },
  ]

  return (
    <div className="flex h-full w-full flex-col">
      <SHeader title="설정" showBack />

      <div className="px-[16px] pb-[24px] pt-[16px]">
        <h2 className="text-16 font-bold text-gray07">계정 정보</h2>

        <div className="mt-[16px] rounded-[8px] border border-gray02 bg-white px-[16px] py-[8px]">
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-gray02 py-[14px] last:border-b-0"
            >
              <span className="text-14 text-gray05">{row.label}</span>
              <span className="text-14 text-gray07">{row.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-[12px] text-[11px] text-gray05">
          계정 정보 변경이 필요한 경우 고객센터 메일로 문의해주세요.
        </p>
      </div>
    </div>
  )
}
