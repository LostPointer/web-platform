import type { ReactNode } from 'react'

export interface PageHeaderProps {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  meta?: ReactNode
  className?: string
}

export function PageHeader({ eyebrow, title, description, actions, meta, className }: PageHeaderProps) {
  const rootClassName = className ? `lp-page-header ${className}` : 'lp-page-header'

  return (
    <section className={rootClassName}>
      <div className="lp-page-header__top">
        <div className="lp-page-header__main">
          {eyebrow ? <div className="lp-page-header__eyebrow">{eyebrow}</div> : null}
          <div className="lp-page-header__title-row">
            <h2 className="lp-page-header__title">{title}</h2>
          </div>
          {description ? <div className="lp-page-header__description">{description}</div> : null}
        </div>
        {actions ? <div className="lp-page-header__actions">{actions}</div> : null}
      </div>
      {meta ? <div className="lp-page-header__meta">{meta}</div> : null}
    </section>
  )
}
