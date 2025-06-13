'use client'

import { SocialLoginButton } from './SocialLoginButton'
import IconKakao from '@/components/icons/IconKakao'
import IconNaver from '@/components/icons/IconNaver'
import IconApple from '@/components/icons/IconApple'

export const SocialLoginButtonList = () => {
  const handleLogin = (provider: 'kakao' | 'naver' | 'apple') => {
    window.location.href = `https://apis.bangtal-boys.com/oauth2/authorization/${provider}?return-url=${window.location.origin}/oauth/callback`
  }

  return (
    <div className="flex w-[280px] flex-col gap-[8px]">
      <SocialLoginButton
        provider="kakao"
        onClick={() => handleLogin('kakao')}
        icon={<IconKakao />}
      />
      <SocialLoginButton
        provider="naver"
        onClick={() => handleLogin('naver')}
        icon={<IconNaver />}
      />
      <SocialLoginButton
        provider="apple"
        onClick={() => handleLogin('apple')}
        icon={<IconApple />}
      />
    </div>
  )
}
