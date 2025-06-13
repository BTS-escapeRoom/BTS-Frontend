import { ReactNode } from 'react'

type SocialProvider = 'kakao' | 'naver' | 'apple'

interface Props {
  provider: SocialProvider
  onClick: () => void
  icon: ReactNode
}

const providerLabelMap: Record<SocialProvider, string> = {
  kakao: '카카오로 로그인',
  naver: '네이버로 로그인',
  apple: 'Apple로 로그인',
}

export const SocialLoginButton = ({ provider, onClick, icon }: Props) => {
  const bgClass = {
    kakao: 'bg-[#FEE500] text-black',
    naver: 'bg-white text-black border border-[#E6E6EA]',
    apple: 'bg-black text-white',
  }[provider]

  return (
    <button
      className={`box-border flex h-[42px] w-full items-center justify-center gap-[16px] rounded-md font-semibold ${bgClass}`}
      onClick={onClick}
    >
      <span className="h-[24px] w-[24px]">{icon}</span>
      <span>{providerLabelMap[provider]}</span>
    </button>
  )
}
