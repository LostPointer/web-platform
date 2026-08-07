// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { PageHeader } from './PageHeader.js'

afterEach(cleanup)

describe('PageHeader', () => {
  it('renders the title as a heading', () => {
    render(<PageHeader title="Experiment #42" />)

    expect(screen.getByRole('heading', { name: 'Experiment #42' })).toBeInTheDocument()
  })

  it('renders eyebrow, description, actions, and meta when given', () => {
    render(
      <PageHeader
        eyebrow="Experiment"
        title="Experiment #42"
        description="Sensor calibration run"
        actions={<button type="button">Archive</button>}
        meta={<span>Started 2 hours ago</span>}
      />,
    )

    expect(screen.getByText('Experiment')).toBeInTheDocument()
    expect(screen.getByText('Sensor calibration run')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Archive' })).toBeInTheDocument()
    expect(screen.getByText('Started 2 hours ago')).toBeInTheDocument()
  })

  it('omits optional regions when not provided', () => {
    const { container } = render(<PageHeader title="Minimal" />)

    expect(container.querySelector('.lp-page-header__meta')).not.toBeInTheDocument()
    expect(container.querySelector('.lp-page-header__eyebrow')).not.toBeInTheDocument()
  })
})
