import { create } from 'zustand'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastState {
  message: string
  type: ToastType
  visible: boolean
}

interface ToastActions {
  showToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    options?: { callback?: () => void; delay?: number },
  ) => void
  hideToast: () => void
}

type ToastStore = ToastState & ToastActions

export const useToastStore = create<ToastStore>((set, get) => ({
  message: '',
  type: 'success',
  visible: false,
  hideToast: () => set({ visible: false }),
  showToast: (
    message: string,
    type: ToastType = 'info',
    duration: number = 3000,
    options?: { callback?: () => void; delay?: number },
  ) => {
    const hideToast = get().hideToast

    set({ message, type, visible: true })

    if (options?.callback && options.delay != null) {
      setTimeout(() => {
        options.callback?.()
      }, options.delay)
    }

    setTimeout(() => {
      hideToast()
    }, duration)
  },
}))
