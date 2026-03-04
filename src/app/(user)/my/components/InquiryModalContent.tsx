'use client'

import SButton from '@/components/button/SButton'
import { useToast } from '@/hooks/useToast'

const INQUIRY_EMAIL = 'dightkddus@gmail.com'

export default function InquiryModalContent() {
  const { showToast } = useToast()

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(INQUIRY_EMAIL)
      showToast('이메일 주소가 복사되었습니다.', 'success')
    } catch {
      showToast('복사에 실패했습니다. 다시 시도해주세요.', 'error')
    }
  }

  return (
    <div className="flex flex-col px-[16px] pb-[16px] pt-[8px]">
      <div className="flex h-[36px] items-center justify-center rounded-[2px] bg-gray02">
        <span className="text-12 text-gray06">{INQUIRY_EMAIL}</span>
      </div>

      <p className="mt-[8px] text-center text-[11px] text-gray05">
        불편사항이나 문의 내용을 이메일로 보내주세요.
      </p>

      <SButton onClick={handleCopyEmail} className="mt-[12px] !rounded-[20px]" size="md">
        이메일주소 복사
      </SButton>
    </div>
  )
}
