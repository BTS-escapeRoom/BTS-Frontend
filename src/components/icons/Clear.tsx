import { SVGProps } from 'react'

export default function IconBack({
  width = 20,
  height = 20,
  fill = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM14.4236 6.42434L10.8479 10.0001L14.4236 13.5758L13.5751 14.4243L9.99935 10.8486L6.42361 14.4243L5.57508 13.5758L9.15082 10.0001L5.57508 6.42435L6.42361 5.57582L9.99935 9.15155L13.5751 5.57582L14.4236 6.42434Z"
        fill={fill}
      />
    </svg>
  )
}
