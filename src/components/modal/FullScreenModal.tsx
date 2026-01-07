'use client'

import React, { useEffect } from 'react'
import { IconClose } from '../icons'

interface FullScreenModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  hideCloseButton?: boolean
  className?: string
}

export default function FullScreenModal({
  isOpen,
  onClose,
  title,
  children,
  hideCloseButton = false,
  className = '',
}: FullScreenModalProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      return
    }

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
    <div className="fixed inset-0 z-50 mx-auto flex w-full min-w-[320px] max-w-[600px] flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-[52px] min-h-[52px] w-full items-center justify-center bg-white text-gray06">
        {title && (
          <h1 className="max-w-[70%] truncate text-center text-16 font-semibold">{title}</h1>
        )}

        {!hideCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-0 flex h-9 w-9 items-center justify-center"
            aria-label="모달 닫기"
          >
            <IconClose />
          </button>
        )}
      </header>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${className}`}>{children}</div>
    </div>
  )
}
