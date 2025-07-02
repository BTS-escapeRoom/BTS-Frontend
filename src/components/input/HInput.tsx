'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

type HInputProps = InputHTMLAttributes<HTMLInputElement>

const HInput = forwardRef<HTMLInputElement, HInputProps>(({ ...props }, ref) => {
  return <input ref={ref} {...props} className={props.className} />
})

HInput.displayName = 'HInput'

export default HInput
