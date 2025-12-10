import { SVGProps } from 'react'

export default function IconComment({
  width = 14,
  height = 14,
  fill = '#BDBDBD',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.79167 7.875H10.2083V7.29167H3.79167V7.875ZM3.79167 6.125H10.2083V5.54167H3.79167V6.125ZM3.79167 4.375H10.2083V3.79167H3.79167V4.375ZM2.69267 9.91667C2.42394 9.91667 2.19975 9.82683 2.02008 9.64717C1.84042 9.4675 1.75039 9.24331 1.75 8.97458V2.69208C1.75 2.42375 1.84003 2.19956 2.02008 2.0195C2.20014 1.83945 2.42414 1.74961 2.69208 1.75H11.3079C11.5763 1.75 11.8003 1.83983 11.9799 2.0195C12.1596 2.19917 12.2496 2.42336 12.25 2.69208V11.7116L10.4551 9.91667H2.69267Z"
        fill={fill}
      />
    </svg>
  )
}
