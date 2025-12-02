import { SVGProps } from 'react'

export default function IconKebabVertical({ fill = '#757575', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.5 8.49935H8.50708V8.50643H8.5V8.49935ZM8.5 3.54102H8.50708V3.5481H8.5V3.54102ZM8.5 13.4577H8.50708V13.4648H8.5V13.4577Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
