'use client'

import React, { useEffect } from 'react'
import { IconModalClose } from '../icons'

interface BottomSheetModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function BottomSheetModal({
  isOpen,
  onClose,
  title,
  children,
}: BottomSheetModalProps) {
  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 body 스타일 복원
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      return
    }

    // 모달이 열릴 때만 body 스타일 변경
    const originalOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.touchAction = originalTouchAction
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-black/65 transition-opacity duration-300"
        style={{
          animation: 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Modal content */}
      <div
        className="relative w-full rounded-t-xl bg-white transition-transform duration-300 ease-out"
        style={{
          height: 'calc(100vh - 112px)',
          marginTop: '112px',
          animation: 'slideInFromBottom 0.3s ease-out',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-[36px] right-[16px] z-10"
          aria-label="모달 닫기"
        >
          <IconModalClose width={24} height={24} fill="#fff" />
        </button>

        {/* Modal content area */}
        <div className="w-full overflow-y-auto" style={{ height: '100%' }}>
          {title && (
            <div className="px-[24px] pb-[16px] pt-[24px]">
              <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
