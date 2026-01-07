'use client'

import { useModalStore } from '@/store/modalStore'
import Modal from './Modal'
import BottomSheetModal from './BottomSheetModal'
import FullScreenModal from './FullScreenModal'

export default function GlobalModal() {
  const { isOpen, view, props, closeModal } = useModalStore()

  if (props?.variant === 'bottomSheet') {
    return (
      <BottomSheetModal isOpen={isOpen} onClose={closeModal} {...props}>
        {view}
      </BottomSheetModal>
    )
  }

  if (props?.variant === 'fullScreen') {
    return (
      <FullScreenModal isOpen={isOpen} onClose={closeModal} {...props}>
        {view}
      </FullScreenModal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} {...props}>
      {view}
    </Modal>
  )
}
