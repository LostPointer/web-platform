// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { FormActions } from './FormActions.js'

afterEach(cleanup)

describe('FormActions', () => {
  it('renders its children', () => {
    render(
      <FormActions>
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </FormActions>,
    )

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it.each([
    ['end', 'lp-form-actions--end'],
    ['start', 'lp-form-actions--start'],
    ['space-between', 'lp-form-actions--space-between'],
  ] as const)('applies the %s alignment class', (align, className) => {
    const { container } = render(
      <FormActions align={align}>
        <button type="button">Ok</button>
      </FormActions>,
    )

    expect(container.firstElementChild).toHaveClass(className)
  })
})
