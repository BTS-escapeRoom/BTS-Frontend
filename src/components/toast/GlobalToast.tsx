'use client'

import SToast from './SToast'
import { useToastStore } from '@/store/toastStore'

export default function GlobalToast() {
  const { message, type, visible, hideToast } = useToastStore()

  return (
    <SToast
      message={message}
      type={type}
      visible={visible}
      onClose={hideToast}
    />
  )
}
