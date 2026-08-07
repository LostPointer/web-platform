import type { ReactNode } from 'react'

export type StatusBadgeTone = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface StatusBadgeProps {
  status: string
  tone?: StatusBadgeTone
  label?: ReactNode
  className?: string
}

export function StatusBadge({ status, tone = 'default', label, className }: StatusBadgeProps) {
  const rootClassName = className
    ? `lp-badge lp-badge--${tone} ${className}`
    : `lp-badge lp-badge--${tone}`

  return <span className={rootClassName}>{label ?? status}</span>
}
