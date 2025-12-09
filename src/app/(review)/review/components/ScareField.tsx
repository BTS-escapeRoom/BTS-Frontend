'use client'

import RadioOption from '@/components/radio/RadioOption'

interface ScareFieldProps {
  scareScore: number
  onScareScoreChange: (scareScore: number) => void
}

export default function ScareField({ scareScore, onScareScoreChange }: ScareFieldProps) {
  const handleChange = (value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
      onScareScoreChange(numValue)
    }
  }

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="text-semibold-14 text-[#000]">공포도</div>
      <div className="flex items-center justify-between px-[12px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <RadioOption
            key={index}
            label={index.toString()}
            value={index.toString()}
            checked={scareScore === index}
            onChange={handleChange}
            size={14}
            labelSize="text-14"
          />
        ))}
      </div>
    </div>
  )
}
