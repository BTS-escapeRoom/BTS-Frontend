'use client'

import { useToastContext } from '@/components/toast/ToastProvider'

export const useToast = () => {
  return useToastContext()
}
