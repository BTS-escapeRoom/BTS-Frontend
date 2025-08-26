import type { Meta, StoryObj } from '@storybook/react'
import SChip from './SChip'

// 샘플 아이콘 (외부 라이브러리 없이 사용 가능)
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const meta: Meta<typeof SChip> = {
  title: 'Common/SChip',
  component: SChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: '칩에 표시할 텍스트',
      defaultValue: '칩',
    },
    bgColor: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'gray02' },
      },
    },
    textColor: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'gray06' },
      },
    },
    icon: {
      control: false,
      description: '아이콘 ReactNode (선택)',
    },
  },
}
export default meta

type Story = StoryObj<typeof SChip>

export const Default: Story = {
  args: {
    text: '기본',
    bgColor: 'gray02',
    textColor: 'gray06',
  },
}

export const WithIcon: Story = {
  args: {
    text: '아이콘',
    bgColor: 'gray03',
    textColor: 'gray07',
    icon: <CloseIcon />,
  },
}

export const HexColors: Story = {
  args: {
    text: 'HEX 색상',
    bgColor: '#FF2DB9',
    textColor: '#ffffff',
  },
}
