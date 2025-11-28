import { SVGProps } from 'react'

export default function IconPlus({
  width = 22,
  height = 22,
  fill = '#fff',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 11.3015V10.1155H10.1155V3H11.3015V10.1155H18.417V11.3015H11.3015V18.417H10.1155V11.3015H3Z"
        fill={fill}
      />
    </svg>
  )
}
