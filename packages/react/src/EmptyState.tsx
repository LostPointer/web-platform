import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, children, className }: EmptyStateProps) {
  const rootClassName = className ? `lp-empty-state ${className}` : 'lp-empty-state'

  return (
    <div className={rootClassName}>
      {icon ? (
        <div className="lp-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <div className="lp-empty-state__title">{title}</div>
      {description ? <div className="lp-empty-state__description">{description}</div> : null}
      {children ? <div className="lp-empty-state__actions">{children}</div> : null}
    </div>
  )
}
