'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import SHeader from '@/components/header/SHeader'
import SInput from '@/components/input/SInput'
import SButton from '@/components/button/SButton'
import { useToast } from '@/hooks/useToast'
import { useSetNickname } from '@/hooks/useSetNickname'
import { useAuthStore } from '@/features/auth/store/authStore'

const MAX_NICKNAME_LENGTH = 10

export default function ProfileEditPage() {
  const { showToast } = useToast()
  const { mutate, isPending } = useSetNickname()
  const memberInfo = useAuthStore((state) => state.memberInfo)
  const fetchMemberInfo = useAuthStore((state) => state.fetchMemberInfo)

  const [nickname, setNickname] = useState('')

  useEffect(() => {
    if (!memberInfo) return
    setNickname(memberInfo.nickname ?? '')
  }, [memberInfo])

  const trimmedNickname = nickname.trim()
  const displayProfileImage = memberInfo?.profileImg || '/images/default-profile.png'

  const isChanged = useMemo(() => {
    if (!memberInfo) return false
    return trimmedNickname !== (memberInfo.nickname ?? '')
  }, [memberInfo, trimmedNickname])

  const isDisabled =
    isPending || !isChanged || !trimmedNickname || trimmedNickname.length > MAX_NICKNAME_LENGTH

  const handleSave = () => {
    if (!trimmedNickname) {
      showToast('닉네임을 입력해주세요.', 'warning')
      return
    }

    mutate(
      {
        nickname: trimmedNickname,
        profileImg: memberInfo?.profileImg || '',
        description: memberInfo?.description || '',
      },
      {
        onSuccess: async () => {
          await fetchMemberInfo()
          showToast('프로필이 저장되었습니다.', 'success')
        },
        onError: (error: Error) => {
          showToast(error.message || '프로필 저장 중 오류가 발생했습니다.', 'error')
        },
      },
    )
  }

  const handleNicknameChange = (value: string) => {
    setNickname(value.slice(0, MAX_NICKNAME_LENGTH))
  }

  return (
    <div className="flex h-full w-full flex-col">
      <SHeader title="설정" showBack />

      <div className="flex-1 overflow-y-auto pb-[92px]">
        <div className="flex w-full flex-col items-center justify-center bg-gray01 py-[70px]">
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full">
            <Image
              src={displayProfileImage}
              alt="프로필 이미지"
              fill
              className="object-cover"
              sizes="74px"
            />
          </div>
        </div>

        <div className="mx-[16px] mt-[26px] flex flex-col gap-[12px]">
          <label className="text-14 font-semibold text-gray06">닉네임</label>
          <SInput
            value={nickname}
            onChange={(e) => handleNicknameChange(e.target.value)}
            maxLength={MAX_NICKNAME_LENGTH}
            placeholder="닉네임을 입력해주세요 (최대 10자)"
            inputSize="lg"
            inputClassName="!rounded-[2px] !bg-gray01 !placeholder:text-[#bdbdbd] !text-[#212121] !text-16"
          />
        </div>
      </div>

      <div className="fixed bottom-[56px] left-1/2 w-full max-w-[600px] -translate-x-1/2 bg-white p-[16px]">
        <SButton onClick={handleSave} disabled={isDisabled}>
          {isPending ? '저장 중...' : '저장'}
        </SButton>
      </div>
    </div>
  )
}
