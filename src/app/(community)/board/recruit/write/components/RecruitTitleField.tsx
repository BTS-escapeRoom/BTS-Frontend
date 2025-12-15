import SInput from '@/components/input/SInput'

interface RecruitTitleFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function RecruitTitleField({ value, onChange }: RecruitTitleFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <input
        className="w-full bg-transparent text-[18px] font-bold text-gray06 outline-none placeholder:text-gray04"
        placeholder="제목을 입력해주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
