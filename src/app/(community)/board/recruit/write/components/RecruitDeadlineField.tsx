import SDatePicker from '@/components/datepicker/SDatePicker'

interface RecruitDeadlineFieldProps {
  value: Date | null
  onChange: (value: Date | null) => void
}

export default function RecruitDeadlineField({ value, onChange }: RecruitDeadlineFieldProps) {
  return (
    <div className="flex items-center gap-[12px]">
      <div className="w-[80px] text-[14px] font-bold text-gray06">모집 마감일</div>
      <SDatePicker
        value={value}
        onChange={onChange}
        includeTime
        showDateDisplay
        placeholder="YYYY년 MM월 DD일 오전/오후 hh시 mm분"
        className="flex-1"
      />
    </div>
  )
}
