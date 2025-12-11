import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import SCheckbox from './SCheckbox'

const meta: Meta<typeof SCheckbox> = {
  title: 'Common/SCheckbox',
  component: SCheckbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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
    size: {
      control: 'number',
      description: '체크박스 아이콘 크기',
      defaultValue: 14,
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
}

export default meta
type Story = StoryObj<typeof SCheckbox>

// 기본 체크박스 (체크 안됨)
export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
    disabled: false,
  },
}

// 체크된 상태
export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    disabled: false,
  },
}

// 비활성화 상태 (체크 안됨)
export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
    disabled: true,
  },
}

// 비활성화 상태 (체크됨)
export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    disabled: true,
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
        <div className="flex items-center gap-2">
          <SCheckbox checked={checked1} onChange={setChecked1} size={12} />
          <span className="text-12">작은 크기 (12px)</span>
        </div>
        <div className="flex items-center gap-2">
          <SCheckbox checked={checked2} onChange={setChecked2} size={14} />
          <span className="text-14">기본 크기 (14px)</span>
        </div>
        <div className="flex items-center gap-2">
          <SCheckbox checked={checked3} onChange={setChecked3} size={20} />
          <span className="text-16">큰 크기 (20px)</span>
        </div>
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
        <SCheckbox checked={checked} onChange={setChecked} />
        <p className="text-14 text-gray-600">현재 상태: {checked ? '체크됨' : '체크 안됨'}</p>
      </div>
    )
  },
}
