'use client'

import React, { useEffect } from 'react'
import { IconModalClose } from '../icons'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  hideCloseButton?: boolean
  closeOnOverlayClick?: boolean
  title?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  hideCloseButton = false,
  closeOnOverlayClick = true,
  title,
}: ModalProps) {
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

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 mx-auto flex w-full min-w-[320px] max-w-[600px] items-center justify-center px-4">
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-black/65 transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className={`relative w-full max-w-[320px] overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        {!hideCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <IconModalClose width={24} height={24} fill="#000" />
          </button>
        )}
        {title && (
          // 가운데정렬
          <div className="pt-[16px] text-center text-[16px]">{title}</div>
        )}
        {children}
      </div>
    </div>
  )
}
