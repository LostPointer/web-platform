import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const meta: Meta = {
  title: 'MUI Adapter/Surfaces',
}

export default meta
type Story = StoryObj

export const PaperElevations: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ p: 3 }}>
      {([1, 2, 3] as const).map((elevation) => (
        <Paper key={elevation} elevation={elevation} sx={{ p: 3 }}>
          Elevation {elevation}
        </Paper>
      ))}
    </Stack>
  ),
}

function DialogAndDrawerDemo() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Stack direction="row" spacing={2} sx={{ p: 3 }}>
      <Button variant="outlined" onClick={() => setDialogOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Themed dialog</DialogTitle>
        <DialogContent>Uses radii.lg and shadows[&apos;3&apos;] from the token adapter.</DialogContent>
      </Dialog>

      <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>Themed drawer surface.</Box>
      </Drawer>
    </Stack>
  )
}

export const DialogAndDrawer: Story = {
  render: () => <DialogAndDrawerDemo />,
}
