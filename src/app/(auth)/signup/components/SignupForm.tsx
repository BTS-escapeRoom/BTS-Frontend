'use client'

import { useState } from 'react'
import { useSetNickname } from '@/hooks/useSetNickname'
import { useRouter } from 'next/navigation'
import SInput from '@/components/input/SInput'
import SButton from '@/components/button/SButton'
import { useToast } from '@/hooks/useToast'

export default function NicknameForm() {
  const [nickname, setNickname] = useState('')
  const { mutate, isPending } = useSetNickname()
  const { showToast } = useToast()
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 이미 사용중인 닉네임입니다 warning
    mutate(
      { nickname },
      {
        onSuccess: () => {
          showToast('닉네임이 설정되었습니다!', 'success', 2000, {
            callback: () => router.replace('/intro'),
            delay: 500,
          })
        },
        onError: (err) => {
          showToast(err.message || '닉네임 설정 중 오류 발생', 'error')
        },
      },
    )
  }

  const isDisabled = !nickname || nickname.length > 10

  return (
    <>
      <SInput
        className="mt-[30px] w-[280px]"
        placeholder="닉네임을 입력해주세요 (최대 10자)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <div className="fixed bottom-[24px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[16px] px-[16px]">
        <div className="text-14 text-gray04">닉네임은 등록 후 언제든 변경할 수 있어요!</div>
        <SButton disabled={isDisabled || isPending} onClick={onSubmit}>
          {isPending ? '설정 중...' : '완료'}
        </SButton>
      </div>
    </>
  )
}
