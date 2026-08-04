import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const meta: Meta<typeof Button> = {
  title: 'MUI Adapter/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ p: 3 }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
}

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ p: 3 }}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="success">Success</Button>
      <Button variant="contained" color="warning">Warning</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="info">Info</Button>
    </Stack>
  ),
}
