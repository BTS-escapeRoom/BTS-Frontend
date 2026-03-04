'use client'

import SButton from '../button/SButton'
import { useModalStore } from '@/store/modalStore'

interface ConfirmModalContentProps {
  title: string
  message: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  confirmFirst?: boolean
  confirmButtonClassName?: string
  cancelButtonClassName?: string
}

export default function ConfirmModalContent({
  title,
  message,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  confirmFirst = false,
  confirmButtonClassName = 'bg-gray07 text-white',
  cancelButtonClassName = 'bg-gray04 text-gray07',
}: ConfirmModalContentProps) {
  const { closeModal } = useModalStore()

  const handleConfirm = () => {
    onConfirm()
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  const actionButtons = confirmFirst
    ? [
        <SButton key="confirm" onClick={handleConfirm} className={confirmButtonClassName} size="md">
          {confirmText}
        </SButton>,
        <SButton key="cancel" onClick={handleCancel} className={cancelButtonClassName} size="md">
          {cancelText}
        </SButton>,
      ]
    : [
        <SButton key="cancel" onClick={handleCancel} className={cancelButtonClassName} size="md">
          {cancelText}
        </SButton>,
        <SButton key="confirm" onClick={handleConfirm} className={confirmButtonClassName} size="md">
          {confirmText}
        </SButton>,
      ]

  return (
    <div className="flex flex-col gap-[16px] px-[24px] py-[16px]">
      <div className="mb-[16px] text-center text-[14px] text-gray06">{message}</div>
      <div className="flex gap-[8px]">{actionButtons}</div>
    </div>
  )
}
