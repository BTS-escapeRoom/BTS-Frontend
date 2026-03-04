'use client'

import Image from 'next/image'
import SHeader from '@/components/header/SHeader'
import { useAuthStore } from '@/features/auth/store/authStore'

const socialLoginMeta: Record<string, { label: string; icon: string }> = {
  KAKAO: { label: '카카오 로그인', icon: '/images/kakao-logo.png' },
  NAVER: { label: '네이버 로그인', icon: '/images/naver-logo.png' },
  APPLE: { label: 'Apple 로그인', icon: '/images/apple-logo.png' },
}

export default function AccountInfoPage() {
  const memberInfo = useAuthStore((state) => state.memberInfo)

  const socialLogin = memberInfo?.socialType ? socialLoginMeta[memberInfo.socialType] : null

  const formatJoinDate = (dateText?: string | null) => {
    if (!dateText) return null

    const date = new Date(dateText)
    if (Number.isNaN(date.getTime())) return null

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}년 ${month}월 ${day}일`
  }

  const joinDate = formatJoinDate(memberInfo?.createdAt)

  return (
    <div className="flex h-full w-full flex-col">
      <SHeader title="설정" showBack />

      <div className="mx-[24px] mt-[16px] flex flex-col gap-[36px]">
        <section className="flex flex-col gap-[16px]">
          <h2 className="text-14 font-bold text-gray07">소셜 로그인 정보</h2>

          {socialLogin ? (
            <div className="flex items-center gap-[16px]">
              <Image
                src={socialLogin.icon}
                alt={socialLogin.label}
                width={36}
                height={36}
                className="h-[36px] w-[36px]"
              />
              <span className="text-14 text-gray06">{socialLogin.label}</span>
            </div>
          ) : (
            <div className="text-14 text-gray06">소셜 로그인 정보가 없습니다.</div>
          )}
        </section>

        {joinDate && (
          <section className="flex flex-col gap-[16px]">
            <h2 className="text-14 font-bold text-gray07">가입 정보</h2>
            <div className="text-14 text-gray06">가입일: {joinDate}</div>
          </section>
        )}
      </div>
    </div>
  )
}
