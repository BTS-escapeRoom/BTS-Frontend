import SInput from '@/components/input/SInput'

interface RecruitPeopleFieldProps {
  value: number | null
  onChange: (value: number | null) => void
}

export default function RecruitPeopleField({ value, onChange }: RecruitPeopleFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    if (next === '') {
      onChange(null)
      return
    }
    const num = Number(next.replace(/[^0-9]/g, ''))
    if (Number.isNaN(num)) {
      return
    }
    onChange(num)
  }

  return (
    <div className="flex items-center gap-[12px]">
      <div className="w-[80px] text-[14px] font-bold text-gray06">모집 인원</div>
      <div className="flex flex-1 items-center gap-[4px]">
        <SInput
          type="text"
          inputMode="numeric"
          value={value ?? ''}
          onChange={handleChange}
          outline={true}
          className="h-[28px] w-[38px]"
          clearable={false}
          inputClassName="text-center h-[28px]"
          inputSize="sm"
        />
        <span className="text-[14px] text-gray06">명</span>
      </div>
    </div>
  )
}
