import { SVGProps } from 'react'

export default function IconThumbsUp({ fill = '#9747FF', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 4.5C11 4.23478 10.8946 3.98043 10.7071 3.79289C10.5196 3.60536 10.2652 3.5 10 3.5H6.84L7.32 1.215C7.33 1.165 7.335 1.11 7.335 1.055C7.335 0.85 7.25 0.66 7.115 0.525L6.585 0L3.295 3.29C3.11 3.475 3 3.725 3 4V9C3 9.26522 3.10536 9.51957 3.29289 9.70711C3.48043 9.89464 3.73478 10 4 10H8.5C8.915 10 9.27 9.75 9.42 9.39L10.93 5.865C10.975 5.75 11 5.63 11 5.5V4.5ZM0 10H2V4H0V10Z"
        fill={fill}
      />
    </svg>
  )
}
