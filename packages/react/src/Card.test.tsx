// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Card, CardHeader } from './Card.js'

afterEach(cleanup)

describe('Card', () => {
  it('renders its children', () => {
    render(<Card>Card body</Card>)

    expect(screen.getByText('Card body')).toBeInTheDocument()
  })

  it('forwards a className alongside the base class', () => {
    const { container } = render(<Card className="custom">content</Card>)

    expect(container.firstElementChild).toHaveClass('lp-card', 'custom')
  })
})

describe('CardHeader', () => {
  it('renders a title and optional actions', () => {
    render(<CardHeader title="Project details" actions={<button type="button">Edit</button>} />)

    expect(screen.getByText('Project details')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })
})
