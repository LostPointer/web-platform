// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { SectionHeader } from './SectionHeader.js'

afterEach(cleanup)

describe('SectionHeader', () => {
  it('renders the title', () => {
    render(<SectionHeader title="Recurring expenses" />)

    expect(screen.getByText('Recurring expenses')).toBeInTheDocument()
  })

  it('renders optional trailing actions', () => {
    render(<SectionHeader title="Recurring expenses" actions={<button type="button">Add</button>} />)

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
})
