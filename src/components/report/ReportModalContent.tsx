import SButton from '../button/SButton'
import RadioOption from '../radio/RadioOption'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/useToast'

export default function ReportModalContent() {
  const [selected, setSelected] = useState('option1')
  const [reason, setReason] = useState('')
  const { showToast } = useToast()
  const handleSubmit = () => {
    // options1이면 '부적절한 용어 사용' 제출
    // options2이면 '스포일러 포함' 제출
    // options3이면 reson 제출

    // 1. options3인데 reason 빈값이면 토스트로 경고
    if(selected === 'option3' && reason === '') {
      // TODO: toast 안보이는 이슈 수정
      showToast('신고 사유를 작성해주세요.', 'warning')
      return
    }
    
  }

  useEffect(() => {
    if (selected !== 'option3') {
      setReason('')
    }
  }, [selected])

  

  return (
    <div className="flex flex-col gap-[16px] px-[8px] py-[24px]">
      <div className="text-[16px]">신고 사유를 선택해주세요.</div>
      <div className="flex flex-col gap-[4px]">
        <RadioOption
          label="부적절한 용어 사용"
          value="option1"
          checked={selected === 'option1'}
          onChange={setSelected}
          size={12}
          color="#424242"
          labelSize="text-[14px]"
        />

        <RadioOption
          label="스포일러 포함"
          value="option2"
          checked={selected === 'option2'}
          onChange={setSelected}
          size={12}
          color="#424242"
          labelSize="text-[14px]"
        />
        <div>
          <RadioOption
            label="기타"
            value="option3"
            checked={selected === 'option3'}
            onChange={setSelected}
            size={12}
            color="#424242"
            labelSize="text-[14px]"
          />
        {/* textarea에 포커스 되면 option3이 선택되도록 */}
        <textarea
          placeholder="신고 사유를 자세히 작성해주시면 서비스 개선에 도움이 됩니다."
          className="h-[120px] w-full resize-none rounded-[2px] bg-[#fafafa] p-[10px] text-[12px] text-gray06 placeholder:text-[#bdbdbd] focus:border-none focus:outline-none"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          onFocus={() => setSelected('option3')}
          />
          </div>
      </div>
      <SButton onClick={handleSubmit}>신고하기</SButton>
    </div>
  )
}
