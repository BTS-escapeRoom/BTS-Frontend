'use client'

import { useModalStore } from '@/store/modalStore'
import Modal from './Modal'

export default function GlobalModal() {
  const { isOpen, view, props, closeModal } = useModalStore()

  return (
    <Modal isOpen={isOpen} onClose={closeModal} {...props}>
      {view}
    </Modal>
  )
}
