'use client'

import { useState, useEffect } from 'react'

type TabKey = 'detail' | 'reservation' | 'review'

type ThemeDetailTabsProps = {
  initial?: TabKey
  onChange?: (key: TabKey) => void
}

export default function ThemeDetailTabs({ initial = 'detail', onChange }: ThemeDetailTabsProps) {
  const [active, setActive] = useState<TabKey>(initial)

  useEffect(() => {
    setActive(initial)
  }, [initial])

  const handleClick = (key: TabKey) => {
    setActive(key)
    onChange?.(key)
  }

  return (
    <div className="w-full">
      <div className="flex h-[52px] w-full items-center justify-between whitespace-nowrap border-b border-gray03">
        {(
          [
            { key: 'detail', label: '상세정보' },
            { key: 'reservation', label: '예약정보' },
            { key: 'review', label: '리뷰' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`flex-1 px-[16px] text-14 text-[#000] ${active === tab.key ? 'font-bold' : 'font-normal'}`}
            onClick={() => handleClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
