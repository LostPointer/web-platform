// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import type { ComponentProps, FormEvent } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FormDialog } from './FormDialog.js'

afterEach(cleanup)

function renderDialog(overrides: Partial<ComponentProps<typeof FormDialog>> = {}) {
  const onClose = vi.fn()
  const onSubmit = vi.fn((event: FormEvent) => event.preventDefault())

  render(
    <FormDialog
      open
      title="Edit project"
      onClose={onClose}
      onSubmit={onSubmit}
      submitLabel="Save"
      cancelLabel="Cancel"
      {...overrides}
    >
      <label htmlFor="name-field">Name</label>
      <input id="name-field" defaultValue="Roadmap" />
    </FormDialog>,
  )

  return { onClose, onSubmit }
}

describe('FormDialog', () => {
  it('renders nothing when closed', () => {
    render(
      <FormDialog open={false} title="Edit" onClose={() => {}} onSubmit={() => {}}>
        content
      </FormDialog>,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('exposes an accessible modal dialog labelled by its title', () => {
    renderDialog()

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAccessibleName('Edit project')
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const { onClose } = renderDialog()

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('reaches Cancel and Submit via Tab', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.tab() // dialog container -> field
    await user.tab() // field -> cancel
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()

    await user.tab() // cancel -> submit
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
  })

  it('closes when clicking the overlay outside the dialog', async () => {
    const user = userEvent.setup()
    const { onClose } = renderDialog()

    const overlay = document.querySelector('.lp-form-dialog__overlay') as HTMLElement
    await user.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when clicking inside the dialog', async () => {
    const user = userEvent.setup()
    const { onClose } = renderDialog()

    await user.click(screen.getByRole('dialog'))

    expect(onClose).not.toHaveBeenCalled()
  })

  it('submits via clicking Save', async () => {
    const user = userEvent.setup()
    const { onSubmit } = renderDialog()

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('submits via Enter inside a form field', async () => {
    const user = userEvent.setup()
    const { onSubmit } = renderDialog()

    await user.click(screen.getByLabelText('Name'))
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('disables the submit button when submitDisabled is set', () => {
    renderDialog({ submitDisabled: true })

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('renders a leftAction slot', () => {
    renderDialog({ leftAction: <button type="button">Delete</button> })

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })
})
