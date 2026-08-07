import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormActions } from '../FormActions.js'
import { FormDialog } from '../FormDialog.js'

const meta: Meta = {
  title: 'React/Forms',
}

export default meta
type Story = StoryObj

export const FormActionsAlignments: Story = {
  name: 'FormActions alignments',
  render: () => (
    <div style={{ padding: 24, display: 'grid', gap: 24, maxWidth: 400 }}>
      <FormActions align="end">
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </FormActions>
      <FormActions align="start">
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </FormActions>
      <FormActions align="space-between">
        <button type="button">Delete</button>
        <button type="button">Save</button>
      </FormActions>
    </div>
  ),
}

function FormDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ padding: 24 }}>
      <button type="button" onClick={() => setOpen(true)}>
        Edit project
      </button>
      <FormDialog
        open={open}
        title="Edit project"
        formId="project-form"
        onClose={() => setOpen(false)}
        onSubmit={(event) => {
          event.preventDefault()
          setOpen(false)
        }}
        leftAction={
          <button type="button" onClick={() => setOpen(false)}>
            Delete
          </button>
        }
      >
        <label htmlFor="project-name">Name</label>
        <input id="project-name" defaultValue="Roadmap" />
      </FormDialog>
    </div>
  )
}

export const FormDialogInteractive: Story = {
  name: 'FormDialog (interactive)',
  render: () => <FormDialogDemo />,
}
