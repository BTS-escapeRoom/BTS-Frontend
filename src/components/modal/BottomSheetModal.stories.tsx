import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import BottomSheetModal from './BottomSheetModal'

const meta: Meta<typeof BottomSheetModal> = {
  title: 'Components/Modal/BottomSheetModal',
  component: BottomSheetModal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    title: {
      control: 'text',
      description: '모달 제목 (선택사항)',
    },
    onClose: {
      action: 'onClose',
      description: '모달 닫기 콜백 함수',
    },
  },
}

export default meta
type Story = StoryObj<typeof BottomSheetModal>

// 기본 모달 (제목 없음)
export const Default: Story = {
  args: {
    isOpen: true,
    title: undefined,
    children: (
      <div className="p-6">
        <p className="text-gray-600">기본 모달 내용입니다.</p>
        <p className="mt-2 text-gray-600">이 모달은 제목이 없습니다.</p>
      </div>
    ),
  },
}

// 제목이 있는 모달
export const WithTitle: Story = {
  args: {
    isOpen: true,
    title: '테마 상세',
    children: (
      <div className="p-6">
        <p className="text-gray-600">제목이 있는 모달입니다.</p>
        <p className="mt-2 text-gray-600">테마 상세 정보를 보여줍니다.</p>
      </div>
    ),
  },
}

// 긴 제목이 있는 모달
export const WithLongTitle: Story = {
  args: {
    isOpen: true,
    title: '매우 긴 제목이 있는 모달입니다. 이 제목은 두 줄로 표시될 수 있습니다.',
    children: (
      <div className="p-6">
        <p className="text-gray-600">긴 제목을 가진 모달입니다.</p>
        <p className="mt-2 text-gray-600">제목이 길어도 잘 표시되는지 확인해보세요.</p>
      </div>
    ),
  },
}

// 닫힌 상태의 모달
export const Closed: Story = {
  args: {
    isOpen: false,
    title: '닫힌 모달',
    children: (
      <div className="p-6">
        <p className="text-gray-600">이 모달은 닫힌 상태입니다.</p>
      </div>
    ),
  },
}

// 인터랙티브 데모 (실제 사용 예시)
export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          모달 열기
        </button>

        <BottomSheetModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="인터랙티브 데모">
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">모달 내용</h3>
            <p className="mb-4 text-gray-600">이 모달은 실제로 열고 닫을 수 있습니다.</p>
            <p className="mb-4 text-gray-600">
              배경을 클릭하거나 닫기 버튼을 눌러서 모달을 닫을 수 있습니다.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              모달 닫기
            </button>
          </div>
        </BottomSheetModal>
      </div>
    )
  },
}

// 다양한 컨텐츠가 있는 모달
export const WithRichContent: Story = {
  args: {
    isOpen: true,
    title: '풍부한 컨텐츠',
    children: (
      <div className="p-6">
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-100 p-4">
            <h4 className="font-semibold text-gray-800">섹션 1</h4>
            <p className="mt-2 text-gray-600">첫 번째 섹션의 내용입니다.</p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <h4 className="font-semibold text-gray-800">섹션 2</h4>
            <p className="mt-2 text-gray-600">두 번째 섹션의 내용입니다.</p>
          </div>

          <div className="flex space-x-2">
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              확인
            </button>
            <button className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
              취소
            </button>
          </div>
        </div>
      </div>
    ),
  },
}
