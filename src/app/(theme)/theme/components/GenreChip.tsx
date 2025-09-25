import SChip from '@/components/chip/SChip'

interface GenreChipProps {
  genre: string
}

const genreColorMap: Record<string, { bgColor: string; textColor: string }> = {
  스릴러: { bgColor: '#761616', textColor: '#fff' },
  드라마: { bgColor: '#B8860B', textColor: '#fff' },
  어드벤처: { bgColor: '#800080', textColor: '#fff' },
  로맨스: { bgColor: '#FF69B4', textColor: '#fff' },
  탐험: { bgColor: '#556B2F', textColor: '#fff' },
  판타지: { bgColor: '#9370DB', textColor: '#fff' },
  게임: { bgColor: '#295E1D', textColor: '#fff' },
  공포: { bgColor: '#000000', textColor: '#fff' },
  미션: { bgColor: '#483D8B', textColor: '#fff' },
  감성: { bgColor: '#FF8BA0', textColor: '#fff' },
  코믹: { bgColor: '#FFD804', textColor: '#000' },
  미스터리: { bgColor: '#2F4F4F', textColor: '#fff' },
  '미스터리/추리': { bgColor: '#2F4F4F', textColor: '#fff' },
  추리: { bgColor: '#2F4F4F', textColor: '#fff' },
  SF: { bgColor: '#424242', textColor: '#fff' },
  사극: { bgColor: '#8B4513', textColor: '#fff' },
  잠입: { bgColor: '#778899', textColor: '#fff' },
  액션: { bgColor: '#1904D9', textColor: '#fff' },
  범죄: { bgColor: '#800000', textColor: '#fff' },
  '19금': { bgColor: '#F81313', textColor: '#fff' },
  기타: { bgColor: '#424242', textColor: '#fff' },
  // 기본값
  default: { bgColor: '#424242', textColor: '#fff' },
}

export default function GenreChip({ genre }: GenreChipProps) {
  const { bgColor, textColor } = genreColorMap[genre] ?? genreColorMap['default']

  return <SChip text={genre} bgColor={bgColor} textColor={textColor} />
}
