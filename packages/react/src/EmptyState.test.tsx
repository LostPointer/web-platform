// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState.js'

afterEach(cleanup)

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No tasks yet" />)

    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('renders an optional description and trailing content', () => {
    render(
      <EmptyState title="No tasks yet" description="Create your first one">
        <button type="button">Create task</button>
      </EmptyState>,
    )

    expect(screen.getByText('Create your first one')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create task' })).toBeInTheDocument()
  })

  it('marks a supplied icon as decorative', () => {
    const { container } = render(<EmptyState title="Empty" icon={<svg data-testid="icon" />} />)

    expect(container.querySelector('.lp-empty-state__icon')).toHaveAttribute('aria-hidden', 'true')
  })

  it('omits the icon wrapper when no icon is given', () => {
    const { container } = render(<EmptyState title="Empty" />)

    expect(container.querySelector('.lp-empty-state__icon')).not.toBeInTheDocument()
  })
})
