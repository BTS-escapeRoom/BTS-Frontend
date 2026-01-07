'use client'

import clsx from 'clsx'
import { IconClose, IconSuccess, IconWarning } from '../icons'
import HButton from '../button/HButton'

type ToastProps = {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, type, visible, onClose }: ToastProps) {
  return (
    <div
      className={clsx(
        'fixed bottom-[89px] left-1/2 -translate-x-1/2 rounded-sm text-center text-14 text-gray07 transition-all duration-200',
        'mx-auto w-[calc(100%-32px)] min-w-[320px] max-w-[568px] border border-solid border-black',
        'z-10 flex flex-row items-center',
        {
          'pointer-events-auto translate-y-0 opacity-100': visible,
          'pointer-events-none translate-y-4 opacity-0': !visible,
          'bg-[#00FB60]': type === 'success',
          'bg-[#F4C328]': type === 'warning',
          'bg-[#FF4D4D]': type === 'error',
          'bg-[#000000] text-white': type === 'info',
        },
      )}
    >
      <div className="flex h-[48px] w-[48px] items-center justify-center bg-black">
        {type === 'success' && <IconSuccess />}
        {type === 'warning' && <IconWarning />}
        {type === 'error' && <IconWarning fill="#FF4D4D" />}
        {type === 'info' && <IconWarning fill="#fff" />}
      </div>
      <div className="flex flex-1 items-center px-[10px]">{message}</div>
      <HButton onClick={onClose}>
        <IconClose width={36} height={36} fill="black" />
      </HButton>
    </div>
  )
}
