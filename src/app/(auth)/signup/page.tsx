'use client'

import HeaderController from '@/components/header/HeaderController'
import { IconKeyhole } from '@/components/icons'
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NicknameForm from './components/SignupForm'
import { useAuth } from '@/features/auth'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [queryClient] = useState(() => new QueryClient())
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 로딩이 완료되고 로그인된 상태라면 메인 페이지로 리다이렉트
    if (!isLoading && isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, isLoading, router])

  // 로딩 중이거나 로그인된 상태라면 아무것도 렌더링하지 않음
  if (isLoading || isAuthenticated) {
    return null
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HeaderController />
        <div className="relative z-0 flex flex-1 flex-col items-center justify-center px-[16px] text-gray07">
          <div className="absolute inset-0 -z-10 mt-[72px] flex items-start justify-center">
            <div className="absolute top-0 h-[150px] w-[150px] rounded-full bg-[#6EFF7F] opacity-80 blur-[40px]" />
            <div className="absolute top-[25px] h-[100px] w-[100px] rounded-full bg-[#6EFF7F] opacity-50 blur-[20px]" />
            <div className="absolute top-[33px] h-[84px] w-[84px] rounded-full bg-[#6EFF7F] blur-[3px]" />
            <IconKeyhole className="absolute top-[51px] h-[48px] w-[48px]" />
          </div>
          <div className="z-10 flex flex-col items-center justify-center gap-[16px] text-20 font-semibold">
            <p>반갑습니다!</p>
            <div>
              <p>방탈소년단에서 사용할</p>
              <p>닉네임을 설정해 주세요</p>
            </div>
          </div>
          <NicknameForm />
        </div>
      </QueryClientProvider>
    </>
  )
}
