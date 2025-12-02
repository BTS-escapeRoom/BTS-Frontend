import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  view: React.ReactNode | null
  props?: any
}

interface ModalActions {
  openModal: (view: React.ReactNode, props?: any) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  isOpen: false,
  view: null,
  props: {},
  openModal: (view, props = {}) => set({ isOpen: true, view, props }),
  closeModal: () => set({ isOpen: false, view: null, props: {} }),
}))
