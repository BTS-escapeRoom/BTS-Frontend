'use client'

import SButton from '../button/SButton'
import { useModalStore } from '@/store/modalStore'

interface ConfirmModalContentProps {
  title: string
  message: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
}

export default function ConfirmModalContent({
  title,
  message,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmModalContentProps) {
  const { closeModal } = useModalStore()

  const handleConfirm = () => {
    onConfirm()
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <div className="flex flex-col gap-[16px] px-[24px] py-[16px]">
      <div className="text-center text-[14px] text-gray06">{message}</div>
      <div className="flex gap-[8px]">
        <SButton onClick={handleCancel} className="bg-gray04 text-gray07" size="md">
          {cancelText}
        </SButton>
        <SButton onClick={handleConfirm} className="bg-gray07 text-white" size="md">
          {confirmText}
        </SButton>
      </div>
    </div>
  )
}
