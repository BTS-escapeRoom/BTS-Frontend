import type { Meta, StoryObj } from '@storybook/react'
import ThemeCard from './ThemeCard'
import type { Theme } from '../types/theme'

const meta: Meta<typeof ThemeCard> = {
  title: 'Theme/ThemeCard',
  component: ThemeCard,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof ThemeCard>

const mockTheme: Theme = {
  id: '1',
  title: '저주받은 산장',
  store: '방탈엔터',
  district: '강남',
  genre: '공포',
  time: 60,
  difficulty: 3,
  thumbnail: 'https://picsum.photos/200/300?random=11',
}

export const Default: Story = {
  args: {
    theme: mockTheme,
  },
}

export const NoThumbnail: Story = {
  args: {
    theme: { ...mockTheme, thumbnail: '' },
  },
}

export const LongTitle: Story = {
  args: {
    theme: {
      ...mockTheme,
      title: '아주아주 길고 장황한 제목으로 잘림 처리 확인하기',
      store: '매우매우 긴 업체 이름으로 잘림 처리 확인하기',
      thumbnail: undefined,
      genre: '어드벤처',
      time: 600,
      difficulty: 4.5,
    },
  },
}

export const DifferentGenres: Story = {
  render: () => {
    const genres = ['공포', '드라마', '판타지', 'SF', '코믹']
    return (
      <div className="flex flex-wrap gap-4">
        {genres.map((g, idx) => (
          <ThemeCard
            key={g}
            theme={{
              ...mockTheme,
              id: String(idx + 1),
              genre: g,
              thumbnail: `https://picsum.photos/200/300?random=${idx + 20}`,
            }}
          />
        ))}
      </div>
    )
  },
}
