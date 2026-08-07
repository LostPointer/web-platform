import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge, type StatusBadgeTone } from '../StatusBadge.js'

const meta: Meta = {
  title: 'React/StatusBadge',
}

export default meta
type Story = StoryObj

const tones: { tone: StatusBadgeTone; label: string }[] = [
  { tone: 'default', label: 'Draft' },
  { tone: 'primary', label: 'Running' },
  { tone: 'success', label: 'Succeeded' },
  { tone: 'warning', label: 'Backfilling' },
  { tone: 'danger', label: 'Failed' },
  { tone: 'info', label: 'Registering' },
]

export const Tones: Story = {
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tones.map(({ tone, label }) => (
        <StatusBadge key={tone} status={label} tone={tone} label={label} />
      ))}
    </div>
  ),
}
