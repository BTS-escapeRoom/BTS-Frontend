import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import SCheckboxWithLabel from './SCheckboxWithLabel'

const meta: Meta<typeof SCheckboxWithLabel> = {
  title: 'Common/SCheckboxWithLabel',
  component: SCheckboxWithLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: '체크박스 라벨 텍스트',
    },
    checked: {
      control: 'boolean',
      description: '체크박스 체크 상태',
    },
    onChange: {
      action: 'onChange',
      description: '체크 상태 변경 콜백 함수',
    },
    disabled: {
      control: 'boolean',
      description: '체크박스 비활성화 여부',
      defaultValue: false,
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '라벨 위치',
      defaultValue: 'right',
    },
    size: {
      control: 'number',
      description: '체크박스 아이콘 크기',
      defaultValue: 14,
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    labelClassName: {
      control: 'text',
      description: '라벨에 적용할 CSS 클래스',
    },
  },
}

export default meta
type Story = StoryObj<typeof SCheckboxWithLabel>

// 기본 (라벨 오른쪽, 체크 안됨)
export const Default: Story = {
  args: {
    label: '기억 안나요',
    checked: false,
    onChange: () => {},
    disabled: false,
    labelPosition: 'right',
  },
}

// 체크된 상태
export const Checked: Story = {
  args: {
    label: '동의합니다',
    checked: true,
    onChange: () => {},
    disabled: false,
    labelPosition: 'right',
  },
}

// 라벨 왼쪽
export const LabelLeft: Story = {
  args: {
    label: '라벨이 왼쪽에 있습니다',
    checked: false,
    onChange: () => {},
    disabled: false,
    labelPosition: 'left',
  },
}

// 비활성화 상태 (체크 안됨)
export const DisabledUnchecked: Story = {
  args: {
    label: '비활성화된 체크박스',
    checked: false,
    onChange: () => {},
    disabled: true,
    labelPosition: 'right',
  },
}

// 비활성화 상태 (체크됨)
export const DisabledChecked: Story = {
  args: {
    label: '비활성화된 체크박스',
    checked: true,
    onChange: () => {},
    disabled: true,
    labelPosition: 'right',
  },
}

// 다양한 크기
export const Sizes: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)

    return (
      <div className="flex flex-col gap-4">
        <SCheckboxWithLabel
          label="작은 크기 (12px)"
          checked={checked1}
          onChange={setChecked1}
          size={12}
        />
        <SCheckboxWithLabel
          label="기본 크기 (14px)"
          checked={checked2}
          onChange={setChecked2}
          size={14}
        />
        <SCheckboxWithLabel
          label="큰 크기 (20px)"
          checked={checked3}
          onChange={setChecked3}
          size={20}
        />
      </div>
    )
  },
}

// 인터랙티브 데모
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="flex flex-col gap-4">
        <SCheckboxWithLabel
          label="체크박스를 클릭하거나 라벨을 클릭해보세요"
          checked={checked}
          onChange={setChecked}
        />
        <p className="text-14 text-gray-600">현재 상태: {checked ? '체크됨' : '체크 안됨'}</p>
      </div>
    )
  },
}

// 여러 체크박스 예시
export const MultipleCheckboxes: Story = {
  render: () => {
    const [options, setOptions] = useState({
      option1: false,
      option2: false,
      option3: false,
    })

    const handleChange = (key: keyof typeof options) => (checked: boolean) => {
      setOptions((prev) => ({ ...prev, [key]: checked }))
    }

    return (
      <div className="flex flex-col gap-3">
        <SCheckboxWithLabel
          label="옵션 1"
          checked={options.option1}
          onChange={handleChange('option1')}
        />
        <SCheckboxWithLabel
          label="옵션 2"
          checked={options.option2}
          onChange={handleChange('option2')}
        />
        <SCheckboxWithLabel
          label="옵션 3"
          checked={options.option3}
          onChange={handleChange('option3')}
        />
        <div className="mt-4 rounded bg-gray-100 p-3">
          <p className="text-12 text-gray-600">
            선택된 옵션:{' '}
            {Object.entries(options)
              .filter(([, checked]) => checked)
              .map(([key]) => key)
              .join(', ') || '없음'}
          </p>
        </div>
      </div>
    )
  },
}

// 긴 라벨 텍스트
export const LongLabel: Story = {
  args: {
    label: '매우 긴 라벨 텍스트입니다. 이 라벨은 여러 줄로 표시될 수 있습니다.',
    checked: false,
    onChange: () => {},
    disabled: false,
    labelPosition: 'right',
  },
}
