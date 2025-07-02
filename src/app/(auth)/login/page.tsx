import Image from 'next/image'
import HeaderWrapper from '@/components/header/HeaderWrapper'
import { SocialLoginButtonList } from './SocialLoginButtonList'

export default function LoginPage() {
  const kakaoLoginHandler = () => {
    window.location.href = `https://apis.bangtal-boys.com/oauth2/authorization/kakao`

    // 지금 url.com?type=kakao&token=abc
  }
  return (
    <>
      <HeaderWrapper />
      <div className="flex h-full w-full flex-col items-center justify-start gap-[96px] pt-[140px]">
        <Image src="/images/Logo.png" alt="방탈소년단" width={190} height={166} priority />
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-14 text-gray05">소셜 로그인으로 간편하게 시작해보세요.</div>
          <SocialLoginButtonList />
        </div>
      </div>
    </>
  )
}
