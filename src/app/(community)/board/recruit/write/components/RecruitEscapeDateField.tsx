import { SCheckboxWithLabel } from '@/components/checkbox'
import { SDatePicker } from '@/components/datepicker'

interface RecruitEscapeDateFieldProps {
  value: Date | null
  onChange: (value: Date | null) => void
  isNegotiable: boolean
  onNegotiableChange: (value: boolean) => void
}

export default function RecruitEscapeDateField({
  value,
  onChange,
  isNegotiable,
  onNegotiableChange,
}: RecruitEscapeDateFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-start gap-[12px]">
        <div className="w-[80px] text-[14px] font-bold text-gray06">탈출 일자</div>
        <div className="flex flex-1 flex-col gap-[8px]">
          <SDatePicker
            value={isNegotiable ? null : value}
            onChange={onChange}
            includeTime
            showDateDisplay
            className="flex-1"
            disabled={isNegotiable}
          />
          <SCheckboxWithLabel
            label="협의 후 결정하기"
            checked={isNegotiable}
            className="text-14"
            onChange={(checked) => {
              onNegotiableChange(checked)
              if (checked) {
                onChange(null)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
