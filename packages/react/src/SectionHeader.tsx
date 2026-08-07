import type { ReactNode } from 'react'

export interface SectionHeaderProps {
  title: ReactNode
  actions?: ReactNode
  className?: string
}

export function SectionHeader({ title, actions, className }: SectionHeaderProps) {
  const rootClassName = className ? `lp-section-header ${className}` : 'lp-section-header'
  return (
    <div className={rootClassName}>
      <div className="lp-section-header__title">{title}</div>
      {actions ? <div className="lp-section-header__actions">{actions}</div> : null}
    </div>
  )
}
