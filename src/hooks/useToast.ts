'use client'

import { useToastStore } from '@/store/toastStore'

export const useToast = () => {
  const showToast = useToastStore((state) => state.showToast)
  return { showToast }
}
