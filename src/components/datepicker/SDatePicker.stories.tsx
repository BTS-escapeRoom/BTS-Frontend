import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SDatePicker from './SDatePicker'

const meta: Meta<typeof SDatePicker> = {
  title: 'Common/SDatePicker',
  component: SDatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'date',
      description: '선택된 날짜',
    },
    onChange: {
      action: 'onChange',
      description: '날짜 변경 콜백 함수',
    },
    showDateDisplay: {
      control: 'boolean',
      description: '날짜 표시 여부',
      defaultValue: true,
    },
    includeTime: {
      control: 'boolean',
      description: '시간 포함 여부',
      defaultValue: false,
    },
    separator: {
      control: 'select',
      options: ['.', '-'],
      description: '날짜 구분자',
      defaultValue: '.',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
}

export default meta
type Story = StoryObj<typeof SDatePicker>

// 기본 (날짜만, 비어있음)
export const Default: Story = {
  args: {
    value: null,
    onChange: () => {},
    showDateDisplay: true,
    includeTime: false,
    separator: '.',
    disabled: false,
  },
}

// 날짜 선택됨 (점 구분자)
export const WithDate: Story = {
  args: {
    value: new Date(2024, 0, 15),
    onChange: () => {},
    showDateDisplay: true,
    includeTime: false,
    separator: '.',
    disabled: false,
  },
}

// 날짜 선택됨 (하이픈 구분자)
export const WithDateHyphen: Story = {
  args: {
    value: new Date(2024, 5, 20),
    onChange: () => {},
    showDateDisplay: true,
    includeTime: false,
    separator: '-',
    disabled: false,
  },
}

// 날짜 + 시간 선택됨 (점 구분자)
export const WithDateTime: Story = {
  args: {
    value: new Date(2024, 2, 10, 14, 30),
    onChange: () => {},
    showDateDisplay: true,
    includeTime: true,
    separator: '.',
    disabled: false,
  },
}

// 날짜 + 시간 선택됨 (하이픈 구분자)
export const WithDateTimeHyphen: Story = {
  args: {
    value: new Date(2024, 8, 25, 9, 15),
    onChange: () => {},
    showDateDisplay: true,
    includeTime: true,
    separator: '-',
    disabled: false,
  },
}

// 아이콘만 표시
export const IconOnly: Story = {
  args: {
    value: null,
    onChange: () => {},
    showDateDisplay: false,
    includeTime: false,
    separator: '.',
    disabled: false,
  },
}

// 비활성화 상태 (비어있음)
export const DisabledEmpty: Story = {
  args: {
    value: null,
    onChange: () => {},
    showDateDisplay: true,
    includeTime: false,
    separator: '.',
    disabled: true,
  },
}

// 비활성화 상태 (값 있음)
export const DisabledWithValue: Story = {
  args: {
    value: new Date(2024, 0, 15),
    onChange: () => {},
    showDateDisplay: true,
    includeTime: false,
    separator: '.',
    disabled: true,
  },
}

// 커스텀 플레이스홀더
export const CustomPlaceholder: Story = {
  args: {
    value: null,
    onChange: () => {},
    showDateDisplay: true,
    includeTime: false,
    separator: '.',
    disabled: false,
    placeholder: '방문일을 선택해주세요',
  },
}

// 인터랙티브 데모 (날짜만)
export const InteractiveDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)

    return (
      <div className="flex flex-col gap-4">
        <SDatePicker value={date} onChange={setDate} separator="." />
        <p className="text-14 text-gray-600">
          선택된 날짜: {date ? date.toLocaleDateString('ko-KR') : '없음'}
        </p>
      </div>
    )
  },
}

// 인터랙티브 데모 (날짜 + 시간)
export const InteractiveDateTime: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null)

    return (
      <div className="flex flex-col gap-4">
        <SDatePicker value={date} onChange={setDate} includeTime={true} separator="." />
        <p className="text-14 text-gray-600">
          선택된 날짜/시간:{' '}
          {date
            ? date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '없음'}
        </p>
      </div>
    )
  },
}

// 다양한 구분자 비교
export const SeparatorComparison: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(new Date(2024, 0, 15))
    const [date2, setDate2] = useState<Date | null>(new Date(2024, 0, 15))

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">점 구분자 (.)</span>
          <SDatePicker value={date1} onChange={setDate1} separator="." />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">하이픈 구분자 (-)</span>
          <SDatePicker value={date2} onChange={setDate2} separator="-" />
        </div>
      </div>
    )
  },
}

// 오전/오후 시간 예시
export const TimeExamples: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(new Date(2024, 0, 15, 9, 30))
    const [date2, setDate2] = useState<Date | null>(new Date(2024, 0, 15, 14, 45))
    const [date3, setDate3] = useState<Date | null>(new Date(2024, 0, 15, 0, 0))
    const [date4, setDate4] = useState<Date | null>(new Date(2024, 0, 15, 12, 0))

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">오전 9시 30분</span>
          <SDatePicker value={date1} onChange={setDate1} includeTime={true} separator="." />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">오후 2시 45분</span>
          <SDatePicker value={date2} onChange={setDate2} includeTime={true} separator="." />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">오전 12시 (자정)</span>
          <SDatePicker value={date3} onChange={setDate3} includeTime={true} separator="." />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">오후 12시 (정오)</span>
          <SDatePicker value={date4} onChange={setDate4} includeTime={true} separator="." />
        </div>
      </div>
    )
  },
}

// 여러 상태 비교
export const StatesComparison: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(null)
    const [date2, setDate2] = useState<Date | null>(new Date(2024, 0, 15))
    const [date3, setDate3] = useState<Date | null>(null)

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">비어있음 (border-bottom만 표시)</span>
          <SDatePicker value={date1} onChange={setDate1} separator="." />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">값 있음 (gray06 텍스트)</span>
          <SDatePicker value={date2} onChange={setDate2} separator="." />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-12 text-gray-600">비활성화</span>
          <SDatePicker value={date3} onChange={setDate3} separator="." disabled={true} />
        </div>
      </div>
    )
  },
}
