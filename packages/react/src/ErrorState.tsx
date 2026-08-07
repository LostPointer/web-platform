import type { ReactNode } from 'react'

export interface ErrorStateProps {
  title?: ReactNode
  message: ReactNode
  onRetry?: () => void
  retryLabel?: ReactNode
  action?: ReactNode
  className?: string
}

export function ErrorState({ title, message, onRetry, retryLabel, action, className }: ErrorStateProps) {
  const rootClassName = className ? `lp-error-state ${className}` : 'lp-error-state'

  return (
    <div className={rootClassName} role="alert">
      {title ? <div className="lp-error-state__title">{title}</div> : null}
      <div className="lp-error-state__message">{message}</div>
      {onRetry || action ? (
        <div className="lp-error-state__actions">
          {onRetry ? (
            <button type="button" className="lp-error-state__retry" onClick={onRetry}>
              {retryLabel ?? 'Retry'}
            </button>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  )
}
