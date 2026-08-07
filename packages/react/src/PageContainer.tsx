import type { ReactNode } from 'react'

export interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  const rootClassName = className ? `lp-page-container ${className}` : 'lp-page-container'
  return <div className={rootClassName}>{children}</div>
}
