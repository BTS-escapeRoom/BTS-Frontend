import STextarea from '@/components/input/STextarea'

interface RecruitContentFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function RecruitContentField({ value, onChange }: RecruitContentFieldProps) {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[14px] font-bold text-gray06">모집 내용</div>
      <STextarea
        className="h-[200px]"
        placeholder="방탈출을 함께할 사람들에게 전달하고 싶은 정보를 자유롭게 작성해주세요!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
