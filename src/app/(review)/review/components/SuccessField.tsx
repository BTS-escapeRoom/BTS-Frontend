'use client'

import SButton from '@/components/button/SButton'

interface SuccessFieldProps {
  isSuccess: boolean | undefined
  onSuccessChange: (isSuccess: boolean | undefined) => void
}

export default function SuccessField({ isSuccess, onSuccessChange }: SuccessFieldProps) {
  const handleSuccessClick = () => {
    onSuccessChange(true)
  }

  const handleFailureClick = () => {
    onSuccessChange(false)
  }

  return (
    <div className="flex items-center gap-[8px]">
      <SButton
        type="button"
        onClick={handleSuccessClick}
        size="md"
        className={`text-semibold-16 flex-1 border bg-transparent ${
          isSuccess === true ? 'border-[#7F1DFF] text-[#7F1DFF]' : 'border-[#BDBDBD] text-[#BDBDBD]'
        }`}
      >
        탈출했어요
      </SButton>
      <SButton
        type="button"
        onClick={handleFailureClick}
        size="md"
        className={`text-semibold-16 flex-1 border bg-transparent ${
          isSuccess === false
            ? 'border-[#7F1DFF] text-[#7F1DFF]'
            : 'border-[#BDBDBD] text-[#BDBDBD]'
        }`}
      >
        탈출못했어요
      </SButton>
    </div>
  )
}
