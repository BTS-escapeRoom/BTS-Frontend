import { SVGProps } from 'react'

export default function IconLockHalfRight({
  width = 11,
  height = 28,
  fill = '#E1CAFF',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.667 9.33333V28H0.000326157V21.3333C0.730103 21.3369 1.35766 21.076 1.88299 20.5507C2.40833 20.0253 2.66966 19.3973 2.66699 18.6667C2.66433 17.936 2.40299 17.3084 1.88299 16.784C1.36299 16.2596 0.734854 16 0.000326157 16V9.33333H4.00033V6.66667C4.00033 5.55556 3.61144 4.61111 2.83366 3.83333C2.05588 3.05556 1.11117 2.66667 0.000326157 2.66667V0C1.84388 0.000888889 3.41588 0.651111 4.71633 1.95067C6.01677 3.25022 6.66699 4.82222 6.66699 6.66667V9.33333H10.667Z"
        fill={fill}
      />
    </svg>
  )
}
