// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { PageContainer } from './PageContainer.js'

afterEach(cleanup)

describe('PageContainer', () => {
  it('renders its children', () => {
    render(
      <PageContainer>
        <main>Page content</main>
      </PageContainer>,
    )

    expect(screen.getByText('Page content')).toBeInTheDocument()
  })
})
