import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'

const meta: Meta = {
  title: 'MUI Adapter/Feedback',
}

export default meta
type Story = StoryObj

export const Chips: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ p: 3 }}>
      <Chip label="Primary" variant="filled" color="primary" />
      <Chip label="Success" variant="filled" color="success" />
      <Chip label="Warning" variant="filled" color="warning" />
      <Chip label="Error" variant="filled" color="error" />
      <Chip label="Info" variant="filled" color="info" />
    </Stack>
  ),
}

export const TooltipDemo: Story = {
  name: 'Tooltip',
  render: () => (
    <Stack sx={{ p: 6 }}>
      <Tooltip title="Themed tooltip content" arrow>
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
    </Stack>
  ),
}

function SnackbarDemo() {
  const [open, setOpen] = useState(true)
  return (
    <Stack sx={{ p: 3 }}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Show snackbar
      </Button>
      <Snackbar open={open} onClose={() => setOpen(false)} message="Themed snackbar content" autoHideDuration={4000} />
    </Stack>
  )
}

export const SnackbarDemoStory: Story = {
  name: 'Snackbar',
  render: () => <SnackbarDemo />,
}

export const Inputs: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3, maxWidth: 320 }}>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </Stack>
  ),
}
