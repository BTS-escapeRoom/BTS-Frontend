interface SChipProps {
  text: string
  bgColor?: string
  textColor?: string
  icon?: React.ReactNode | React.ReactElement | string
  borderColor?: string
}

const BG: Record<string, string> = {
  transperent: 'bg-transperent',
  gray01: 'bg-gray01',
  gray02: 'bg-gray02',
  gray03: 'bg-gray03',
  gray04: 'bg-gray04',
  gray05: 'bg-gray05',
  gray06: 'bg-gray06',
  gray07: 'bg-gray07',
  white: 'bg-white',
  black: 'bg-black',
}
const TEXT: Record<string, string> = {
  transperent: 'text-transperent',
  gray01: 'text-gray01',
  gray02: 'text-gray02',
  gray03: 'text-gray03',
  gray04: 'text-gray04',
  gray05: 'text-gray05',
  gray06: 'text-gray06',
  gray07: 'text-gray07',
  white: 'text-white',
  black: 'text-black',
}

const BORDER: Record<string, string> = {
  gray01: 'border-gray01',
  gray02: 'border-gray02',
  gray03: 'border-gray03',
  gray04: 'border-gray04',
  gray05: 'border-gray05',
  gray06: 'border-gray06',
  gray07: 'border-gray07',
  white: 'border-white',
  black: 'border-black',
}

export default function SChip({
  text,
  bgColor = 'gray02',
  textColor = 'gray06',
  icon,
  borderColor,
}: SChipProps) {
  const isHex = (v?: string) => v?.startsWith('#')
  const bgStyle = isHex(bgColor) ? { backgroundColor: bgColor } : undefined
  const textStyle = isHex(textColor) ? { color: textColor } : undefined
  const borderStyle = borderColor
    ? isHex(borderColor)
      ? { borderColor, borderWidth: '0.5px', borderStyle: 'solid' }
      : undefined
    : undefined

  const bgClass = isHex(bgColor) ? '' : (BG[bgColor] ?? '')
  const textClass = isHex(textColor) ? '' : (TEXT[textColor] ?? '')
  const borderClass = borderColor
    ? isHex(borderColor)
      ? ''
      : `border-[0.5px] ${BORDER[borderColor] ?? ''}`
    : ''

  return (
    <div
      className={`inline-flex items-center rounded-[2px] px-[4px] ${bgClass} ${textClass} ${borderClass}`}
      style={{ ...bgStyle, ...textStyle, ...borderStyle }}
    >
      {icon && <span className="mr-[2px] shrink-0">{icon}</span>}
      <span className="whitespace-nowrap text-12">{text}</span>
    </div>
  )
}
