interface RadioOptionProps {
  label: string
  value: string
  checked: boolean
  onChange: (value: string) => void

  size?: number // 원 크기
  color?: string // 선택됐을 때 색
  disabled?: boolean
  labelSize?: string
  borderColor?: string // 선택 안됐을 때 border 색 (gray04)
}

export default function RadioOption({
  label,
  value,
  checked,
  onChange,
  size = 18,
  color = '#4F46E5', // 예시: 파란색
  disabled = false,
  labelSize = 'text-[12px]',
  borderColor = '#D4D4D4', // gray04
}: RadioOptionProps) {
  return (
    <label
      className={`flex select-none items-center gap-[4px] ${
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
      }`}
      onClick={() => !disabled && onChange(value)}
    >
      {/* 원 하나만 사용 */}
      <span
        className="inline-flex rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: checked ? color : 'transparent',
          border: checked ? 'none' : `1px solid ${borderColor}`,
        }}
      />

      {/* 라벨 */}
      <span className={labelSize}>{label}</span>

      {/* 실제 라디오 (접근성용, 화면에서는 숨김) */}
      <input
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only" // tailwind: 화면에서는 숨기고 스크린리더용으로만
      />
    </label>
  )
}
