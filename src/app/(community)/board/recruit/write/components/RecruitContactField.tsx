import RadioOption from '@/components/radio/RadioOption'
import SInput from '@/components/input/SInput'

type ContactMethod = 'OPEN_TALK' | 'GOOGLE' | 'ETC'

interface RecruitContactFieldProps {
  method: ContactMethod
  url: string
  onMethodChange: (method: ContactMethod) => void
  onUrlChange: (url: string) => void
}

function getPlaceholder(method: ContactMethod) {
  if (method === 'OPEN_TALK') {
    return '모집을 위해 생성한 오픈카톡방 주소를 남겨주세요.'
  }
  if (method === 'GOOGLE') {
    return '신청을 위한 구글폼 링크를 남겨주세요.'
  }
  return '신청을 위한 연락 수단을 남겨주세요. (선택)'
}

export default function RecruitContactField({
  method,
  url,
  onMethodChange,
  onUrlChange,
}: RecruitContactFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="text-[14px] font-bold text-gray06">연락 방법</div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex gap-[12px]">
          <RadioOption
            label="카카오 오픈톡"
            value="OPEN_TALK"
            size={14}
            color="#757575"
            checked={method === 'OPEN_TALK'}
            onChange={(v) => onMethodChange(v as ContactMethod)}
          />
          <RadioOption
            label="구글폼"
            value="GOOGLE"
            size={14}
            color="#757575"
            checked={method === 'GOOGLE'}
            onChange={(v) => onMethodChange(v as ContactMethod)}
          />
          <RadioOption
            label="기타"
            value="ETC"
            color="#757575"
            size={14}
            checked={method === 'ETC'}
            onChange={(v) => onMethodChange(v as ContactMethod)}
          />
        </div>
        <SInput
          outline
          inputSize="sm"
          inputClassName="text-14 h-[40px]"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder={getPlaceholder(method)}
          className="h-[40px] w-full"
        />
      </div>
    </div>
  )
}
