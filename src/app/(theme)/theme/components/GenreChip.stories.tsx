import type { Meta, StoryObj } from '@storybook/nextjs'
import GenreChip from './GenreChip'

const meta: Meta<typeof GenreChip> = {
  title: 'Chip/GenreChip',
  component: GenreChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    genre: {
      control: 'text',
      description: '장르 이름 (예: 스릴러, 드라마, 공포 등)',
    },
  },
}
export default meta

type Story = StoryObj<typeof GenreChip>

export const Default: Story = {
  args: {
    genre: '스릴러',
  },
}

export const AllGenres: Story = {
  render: () => {
    const genres = [
      '스릴러',
      '드라마',
      '어드벤처',
      '로맨스',
      '탐험',
      '판타지',
      '게임',
      '공포',
      '미션',
      '감성',
      '코믹',
      '미스터리',
      'SF',
      '사극',
      '잠입',
      '액션',
      '범죄',
      '19금',
      '기타',
    ]

    return (
      <div className="flex max-w-[400px] flex-wrap gap-2">
        {genres.map((g) => (
          <GenreChip key={g} genre={g} />
        ))}
      </div>
    )
  },
}
