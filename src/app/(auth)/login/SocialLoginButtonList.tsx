'use client'

import { useEffect, useState } from 'react'
import { SocialLoginButton } from './SocialLoginButton'
import { IconKakao, IconNaver, IconApple } from '@/components/icons'

export const SocialLoginButtonList = () => {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const handleLogin = (provider: 'kakao' | 'naver' | 'apple') => {
    if (!origin) return
    window.location.href = `https://apis.bangtal-boys.com/oauth2/authorization/${provider}?return-url=${encodeURIComponent(origin)}/oauth/callback`
  }

  return (
    <div className="flex w-[280px] flex-col gap-[8px]">
      {origin && (
        <>
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
        </>
      )}
    </div>
  )
}
