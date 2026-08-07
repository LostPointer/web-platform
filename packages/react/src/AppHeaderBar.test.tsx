// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { AppHeaderBar } from './AppHeaderBar.js'

afterEach(cleanup)

describe('AppHeaderBar', () => {
  it('renders as a header landmark with the title', () => {
    render(<AppHeaderBar title="Task Tracker" />)

    const header = screen.getByRole('banner')
    expect(header).toHaveTextContent('Task Tracker')
  })

  it('renders an optional subtitle and action slot', () => {
    render(
      <AppHeaderBar
        title="Task Tracker"
        subtitle="Acme Space"
        actions={<button type="button">Log out</button>}
      />,
    )

    expect(screen.getByText('Acme Space')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument()
  })
})
