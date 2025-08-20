'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import SToast from './SToast'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastState {
  message: string
  type: ToastType
  visible: boolean
}

interface ToastContextType {
  showToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    options?: { callback?: () => void; delay?: number },
  ) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      duration: number = 3000,
      options?: { callback?: () => void; delay?: number },
    ) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      setToast({ message, type, visible: true })

      if (options?.callback && options.delay != null) {
        setTimeout(() => {
          options.callback?.()
        }, options.delay)
      }

      timeoutRef.current = setTimeout(() => {
        hideToast()
      }, duration)
    },
    [hideToast],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <SToast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToastContext must be used within ToastProvider')
  return context
}
