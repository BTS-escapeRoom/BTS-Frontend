'use client'

import { useRouter } from 'next/navigation'
import SButton from '@/components/button/SButton'

export default function LoginPrompt() {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center px-[20px] py-[60px]">
      <div className="mb-[24px] text-center">
        <div className="text-14 leading-relaxed text-gray06">
          로그인 후 다른 사람이 작성한
          <br />
          리뷰를 확인해보세요!
        </div>
      </div>

      <SButton
        onClick={handleLoginClick}
        className="w-[200px] bg-transparent text-14 text-gray04 underline"
      >
        로그인하러 가기
      </SButton>
    </div>
  )
}
