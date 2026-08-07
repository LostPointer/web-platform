import type { ReactNode } from 'react'

export type FormActionsAlign = 'end' | 'start' | 'space-between'

export interface FormActionsProps {
  children: ReactNode
  align?: FormActionsAlign
  className?: string
}

export function FormActions({ children, align = 'end', className }: FormActionsProps) {
  const rootClassName = className
    ? `lp-form-actions lp-form-actions--${align} ${className}`
    : `lp-form-actions lp-form-actions--${align}`

  return <div className={rootClassName}>{children}</div>
}
