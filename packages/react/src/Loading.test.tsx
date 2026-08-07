// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Loading } from './Loading.js'

afterEach(cleanup)

describe('Loading', () => {
  it('exposes a polite live region with a visible message', () => {
    render(<Loading message="Fetching tasks" />)

    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByText('Fetching tasks')).toBeInTheDocument()
  })

  it('falls back to screen-reader-only text when no message is given', () => {
    render(<Loading />)

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Loading')
  })

  it('hides the decorative spinner from assistive tech', () => {
    const { container } = render(<Loading message="Loading" />)
    const spinner = container.querySelector('.lp-loading__spinner')

    expect(spinner).toHaveAttribute('aria-hidden', 'true')
  })

  it('omits the spinner when showSpinner is false', () => {
    const { container } = render(<Loading message="Loading" showSpinner={false} />)

    expect(container.querySelector('.lp-loading__spinner')).not.toBeInTheDocument()
  })
})
