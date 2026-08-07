import { useEffect, useId, useRef, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FormActions } from './FormActions.js'

export interface FormDialogProps {
  open: boolean
  title: ReactNode
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  formId?: string
  submitLabel?: ReactNode
  cancelLabel?: ReactNode
  submitDisabled?: boolean
  leftAction?: ReactNode
  children: ReactNode
  className?: string
}

export function FormDialog({
  open,
  title,
  onClose,
  onSubmit,
  formId,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  submitDisabled,
  leftAction,
  children,
  className,
}: FormDialogProps) {
  const titleId = useId()
  const overlayMouseDownOnSelfRef = useRef(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    dialogRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const rootClassName = className ? `lp-form-dialog ${className}` : 'lp-form-dialog'

  return createPortal(
    <div
      className="lp-form-dialog__overlay"
      onMouseDown={(event) => {
        overlayMouseDownOnSelfRef.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && overlayMouseDownOnSelfRef.current) {
          onClose()
        }
        overlayMouseDownOnSelfRef.current = false
      }}
    >
      <div
        className={rootClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
      >
        <h2 id={titleId} className="lp-form-dialog__title">
          {title}
        </h2>
        <form id={formId} className="lp-form-dialog__form" onSubmit={onSubmit}>
          <div className="lp-form-dialog__content">{children}</div>
          <FormActions align={leftAction ? 'space-between' : 'end'}>
            {leftAction}
            <span className="lp-form-dialog__buttons">
              <button type="button" className="lp-form-dialog__cancel" onClick={onClose}>
                {cancelLabel}
              </button>
              <button
                type="submit"
                form={formId}
                className="lp-form-dialog__submit"
                disabled={submitDisabled}
              >
                {submitLabel}
              </button>
            </span>
          </FormActions>
        </form>
      </div>
    </div>,
    document.body,
  )
}
