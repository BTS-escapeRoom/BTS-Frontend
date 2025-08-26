import { SVGProps } from 'react'

export default function IconBack({
  width = 10,
  height = 10,
  fill = '#424242',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="5" cy="5" r="4.5" stroke={fill} />
      <path d="M5 1.66602V5.16602L7.5 7.49935" stroke={fill} />
    </svg>
  )
}
