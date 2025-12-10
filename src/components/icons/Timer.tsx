import { SVGProps } from 'react'

export default function IconTimer({
  width = 12,
  height = 12,
  fill = '#424242',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 4H5.5V7H4.5V4ZM6.5 0.5H3.5V1.5H6.5V0.5ZM8.515 3.695C9.15304 4.49063 9.50051 5.48014 9.5 6.5C9.5 8.985 7.5 11 5 11C3.80653 11 2.66193 10.5259 1.81802 9.68198C0.974106 8.83807 0.5 7.69347 0.5 6.5C0.5 5.30653 0.974106 4.16193 1.81802 3.31802C2.66193 2.47411 3.80653 2 5 2C6.06 2 7.035 2.37 7.81 3L8.52 2.28C8.775 2.5 9 2.73 9.225 2.985L8.515 3.695ZM8.5 6.5C8.5 4.565 6.935 3 5 3C3.065 3 1.5 4.565 1.5 6.5C1.5 8.435 3.065 10 5 10C6.935 10 8.5 8.435 8.5 6.5ZM10.5 3.5V6.5H11.5V3.5H10.5ZM10.5 8.5H11.5V7.5H10.5V8.5Z"
        fill={fill}
      />
    </svg>
  )
}
