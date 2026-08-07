// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ErrorState } from './ErrorState.js'

afterEach(cleanup)

describe('ErrorState', () => {
  it('announces itself as an alert with the message', () => {
    render(<ErrorState message="Something went wrong" />)

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })

  it('renders an optional title', () => {
    render(<ErrorState title="Load failed" message="Try again later" />)

    expect(screen.getByText('Load failed')).toBeInTheDocument()
  })

  it('fires onRetry on mouse click', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorState message="Failed" onRetry={onRetry} retryLabel="Try again" />)

    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('fires onRetry via keyboard activation', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorState message="Failed" onRetry={onRetry} retryLabel="Try again" />)

    await user.tab()
    expect(screen.getByRole('button', { name: 'Try again' })).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders a supplied action alongside retry', () => {
    render(
      <ErrorState
        message="Failed"
        onRetry={() => {}}
        action={<a href="/home">Go home</a>}
      />,
    )

    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument()
  })

  it('renders no action row when neither onRetry nor action is given', () => {
    const { container } = render(<ErrorState message="Failed" />)

    expect(container.querySelector('.lp-error-state__actions')).not.toBeInTheDocument()
  })
})
