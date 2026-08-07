import type { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const rootClassName = className ? `lp-card ${className}` : 'lp-card'
  return <div className={rootClassName}>{children}</div>
}

export interface CardHeaderProps {
  title: ReactNode
  actions?: ReactNode
  className?: string
}

export function CardHeader({ title, actions, className }: CardHeaderProps) {
  const rootClassName = className ? `lp-card-header ${className}` : 'lp-card-header'
  return (
    <div className={rootClassName}>
      <div className="lp-card-header__title">{title}</div>
      {actions ? <div className="lp-card-header__actions">{actions}</div> : null}
    </div>
  )
}
