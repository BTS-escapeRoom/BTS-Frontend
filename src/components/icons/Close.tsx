import { SVGProps } from 'react'

export default function IconClose({
  width = 36,
  height = 36,
  fill = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 24.0919L24.0919 11"
        stroke={fill}
        strokeWidth="1.54289"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M24.0919 24.0919L11 11"
        stroke={fill}
        strokeWidth="1.54289"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
