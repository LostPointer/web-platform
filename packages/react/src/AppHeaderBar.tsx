import type { ReactNode } from 'react'

export interface AppHeaderBarProps {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  className?: string
}

export function AppHeaderBar({ title, subtitle, actions, className }: AppHeaderBarProps) {
  const rootClassName = className ? `lp-app-header ${className}` : 'lp-app-header'

  return (
    <header className={rootClassName}>
      <div className="lp-app-header__titles">
        <span className="lp-app-header__title">{title}</span>
        {subtitle ? <span className="lp-app-header__subtitle">{subtitle}</span> : null}
      </div>
      {actions ? <div className="lp-app-header__actions">{actions}</div> : null}
    </header>
  )
}
