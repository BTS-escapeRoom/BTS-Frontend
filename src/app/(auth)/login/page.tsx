'use client'
import Image from 'next/image'

export default function LoginPage() {
  const kakaoLoginHandler = () => {
    window.location.href = `https://apis.bangtal-boys.com/oauth2/authorization/kakao`

    // 지금 url.com?type=kakao&token=abc
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[64px]">
      <Image src="/images/Logo.png" alt="방탈소년단" width={190} height={166} priority />
      <div className="flex flex-col gap-[24px]">
        <span>소셜 로그인으로 간편하게 시작해보세요.</span>
        <button onClick={() => kakaoLoginHandler()}>카카오로그인</button>
      </div>
    </div>
  )
}
