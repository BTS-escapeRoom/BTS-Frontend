import { SVGProps } from 'react'

export default function IconChevronDown({
  width = 16,
  height = 16,
  fill = '#414141',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.6663 5.33333C14.6674 5.42077 14.6502 5.50746 14.6157 5.58783C14.5813 5.6682 14.5304 5.74047 14.4663 5.8L8.46634 11.8C8.19968 12.0667 7.78634 12.0667 7.51967 11.8L1.53301 5.8C1.26634 5.53333 1.26634 5.12 1.53301 4.85333C1.79967 4.58667 2.21301 4.58667 2.47967 4.85333L7.99967 10.3867L13.533 4.85333C13.7997 4.58667 14.213 4.58667 14.4797 4.85333C14.613 4.98667 14.6797 5.16 14.6797 5.32L14.6663 5.33333Z"
        fill={fill}
      />
    </svg>
  )
}
