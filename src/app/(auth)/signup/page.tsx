'use client'

import HeaderWrapper from '@/components/header/HeaderWrapper'
import { IconKeyhole } from '@/components/icons'
import SInput from '@/components/input/SInput'
import Image from 'next/image'
import { useState } from 'react'

export default function SignUpPage() {
  const [nickname, setNickname] = useState<string>('')

  return (
    <>
      <HeaderWrapper />
      <div className="z-1 relative flex flex-1 flex-col items-center justify-center px-[16px] text-gray07">
        {/* <div className="relative flex h-[200px] w-full items-center justify-center">
          <div className="absolute h-[200px] w-[200px] animate-pulse rounded-full bg-green-400 opacity-30 blur-[80px]" />
        </div> */}
        <div className="-z-1 absolute inset-0 mt-[150px] flex items-start justify-center">
          <div className="absolute top-0 h-[150px] w-[150px] rounded-full bg-[#6EFF7F] opacity-80 blur-[40px]" />
          <div className="absolute top-[25px] h-[100px] w-[100px] rounded-full bg-[#6EFF7F] opacity-50 blur-[20px]" />
          <div className="absolute top-[33px] h-[84px] w-[84px] rounded-full bg-[#6EFF7F] blur-[3px]" />
          <IconKeyhole className="absolute top-[51px] h-[48px] w-[48px]" />
        </div>
        <div className="z-10 flex flex-col items-center justify-center gap-[16px] text-[20px] font-semibold">
          <p>반갑습니다!</p>
          <div>
            <p>방탈소년단에서 사용할</p>
            <p>닉네임을 설정해 주세요</p>
          </div>
        </div>
        <SInput
          className="mt-[30px] w-[280px]"
          placeholder="닉네임을 입력해주세요 (최대 10자)"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <div className="absolute bottom-[24px] flex flex-col">
          <div>닉네임은 등록 후 언제든 변경할 수 있어요!</div>
          <button>완료</button>
        </div>
      </div>
    </>
  )
}
