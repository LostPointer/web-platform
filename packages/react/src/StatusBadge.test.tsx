// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { StatusBadge } from './StatusBadge.js'

afterEach(cleanup)

describe('StatusBadge', () => {
  it('falls back to the status string when no label is given', () => {
    render(<StatusBadge status="running" />)

    expect(screen.getByText('running')).toBeInTheDocument()
  })

  it('prefers a supplied label over the raw status', () => {
    render(<StatusBadge status="running" label="In progress" />)

    expect(screen.getByText('In progress')).toBeInTheDocument()
    expect(screen.queryByText('running')).not.toBeInTheDocument()
  })

  it('applies the tone class so status is never conveyed by color alone without a class hook', () => {
    render(<StatusBadge status="failed" tone="danger" label="Failed" />);

    expect(screen.getByText('Failed')).toHaveClass('lp-badge--danger')
  })

  it('defaults to the "default" tone', () => {
    render(<StatusBadge status="draft" />)

    expect(screen.getByText('draft')).toHaveClass('lp-badge--default')
  })
})
