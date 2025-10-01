import { SVGProps } from 'react'

export default function IconSearch({
  width = 20,
  height = 20,
  fill = '#CED7DE',
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
        d="M14.136 14.9967C12.8155 16.1209 11.1038 16.7993 9.23366 16.7993C5.0547 16.7993 1.66699 13.4116 1.66699 9.23268C1.66699 5.05373 5.0547 1.66602 9.23366 1.66602C13.4126 1.66602 16.8003 5.05373 16.8003 9.23268C16.8003 11.0915 16.1301 12.7938 15.018 14.111L18.65 17.743L17.7662 18.6269L14.136 14.9967ZM15.5503 9.23268C15.5503 12.7213 12.7223 15.5493 9.23366 15.5493C5.74506 15.5493 2.91699 12.7213 2.91699 9.23268C2.91699 5.74408 5.74506 2.91602 9.23366 2.91602C12.7223 2.91602 15.5503 5.74408 15.5503 9.23268Z"
        fill={fill}
      />
    </svg>
  )
}
