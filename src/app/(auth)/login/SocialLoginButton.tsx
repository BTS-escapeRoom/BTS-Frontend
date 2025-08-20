import { ReactNode } from 'react'

type SocialProvider = 'kakao' | 'naver' | 'apple'

interface Props {
  provider: SocialProvider
  onClick: () => void
  icon: ReactNode
}

const providerLabelMap: Record<SocialProvider, string> = {
  kakao: '카카오 로그인',
  naver: '네이버 로그인',
  apple: 'Apple 로그인',
}

export const SocialLoginButton = ({ provider, onClick, icon }: Props) => {
  const bgClass = {
    kakao: 'bg-[#FEE500] text-black',
    naver: 'bg-white text-black border border-[#E6E6EA]',
    apple: 'bg-black text-white',
  }[provider]

  return (
    <button
      className={`text-medium-14 box-border flex h-[42px] w-full items-center justify-center gap-[4px] rounded-md ${bgClass}`}
      onClick={onClick}
    >
      <span className="h-[24px] w-[24px]">{icon}</span>
      <span>{providerLabelMap[provider]}</span>
    </button>
  )
}
