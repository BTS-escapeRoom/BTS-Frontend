import { SVGProps } from 'react'

export default function IconMessage({
  width = 24,
  height = 24,
  fill = '#000000',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1228_3638)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7296 3.58203C6.90811 3.58203 3 6.60146 3 10.3254C3 12.6414 4.51158 14.6831 6.8134 15.8975L5.8449 19.4354C5.75933 19.7481 6.11686 19.9972 6.39141 19.8161L10.6368 17.0141C10.995 17.0487 11.3591 17.0689 11.7296 17.0689C16.5507 17.0689 20.4591 14.0496 20.4591 10.3254C20.4591 6.60146 16.5507 3.58203 11.7296 3.58203"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1228_3638">
          <rect width="17.4591" height="17.4592" fill="white" transform="translate(3 3)" />
        </clipPath>
      </defs>
    </svg>
  )
}
