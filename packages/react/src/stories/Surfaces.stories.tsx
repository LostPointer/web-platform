import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader } from '../Card.js'
import { SectionHeader } from '../SectionHeader.js'

const meta: Meta = {
  title: 'React/Surfaces',
}

export default meta
type Story = StoryObj

export const CardPlain: Story = {
  name: 'Card (plain)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Card>Just a card body, no header.</Card>
    </div>
  ),
}

export const CardWithHeader: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Card>
        <CardHeader title="Project details" />
        <p style={{ margin: 0 }}>Card content goes here.</p>
      </Card>
    </div>
  ),
}

export const CardWithHeaderActions: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Card>
        <CardHeader title="Project details" actions={<button type="button">Edit</button>} />
        <p style={{ margin: 0 }}>Card content goes here.</p>
      </Card>
    </div>
  ),
}

export const SectionHeaderDemo: Story = {
  name: 'SectionHeader',
  render: () => (
    <div style={{ padding: 24, display: 'grid', gap: 16, maxWidth: 360 }}>
      <SectionHeader title="Recurring expenses" />
      <SectionHeader title="Recurring expenses" actions={<button type="button">Add</button>} />
    </div>
  ),
}
