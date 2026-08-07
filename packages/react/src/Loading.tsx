import type { ReactNode } from 'react'

export interface LoadingProps {
  message?: ReactNode
  showSpinner?: boolean
  className?: string
}

export function Loading({ message, showSpinner = true, className }: LoadingProps) {
  const rootClassName = className ? `lp-loading ${className}` : 'lp-loading'
  const messageClassName = message ? 'lp-loading__message' : 'lp-loading__message lp-visually-hidden'

  return (
    <div className={rootClassName} role="status" aria-live="polite">
      {showSpinner ? <span className="lp-loading__spinner" aria-hidden="true" /> : null}
      <span className={messageClassName}>{message ?? 'Loading'}</span>
    </div>
  )
}
