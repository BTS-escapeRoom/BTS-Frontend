'use client'

import HButton from './HButton'

type MoreMenuButtonItem = {
  text: string
  onClick: () => void
  className?: string
}

type MoreMenuButtonProps = {
  list: MoreMenuButtonItem[]
}

export default function MoreMenuButton({ list }: MoreMenuButtonProps) {
  if (list.length === 0) return null

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, onClick: () => void) => {
    e.stopPropagation()
    onClick()
  }
  return (
    <div className="flex flex-col rounded-2xl bg-[#CCCCCC]">
      {list.map((item, index) => (
        <HButton
          key={index}
          className={`h-[54px] py-[4px] ${
            index < list.length - 1 ? 'border-b border-[#909090]' : ''
          } ${item.className ?? ''}`}
          onClick={(e) => {
            handleClick(e, item.onClick)
          }}
        >
          {item.text}
        </HButton>
      ))}
    </div>
  )
}
