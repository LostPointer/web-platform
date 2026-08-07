import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppHeaderBar } from '../AppHeaderBar.js'
import { PageContainer } from '../PageContainer.js'
import { PageHeader } from '../PageHeader.js'

const meta: Meta = {
  title: 'React/Layout',
}

export default meta
type Story = StoryObj

export const PageHeaderFull: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <PageHeader
        eyebrow="Experiment"
        title="Sensor calibration run #42"
        description="Captures baseline drift across all active sensors before the next deployment."
        actions={<button type="button">Archive</button>}
        meta={
          <>
            <span>Started 2 hours ago</span>
            <span>·</span>
            <span>12 sensors</span>
          </>
        }
      />
    </div>
  ),
}

export const PageHeaderMinimal: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <PageHeader title="Projects" />
    </div>
  ),
}

export const PageHeaderNarrowViewport: Story = {
  name: 'PageHeader (narrow viewport)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <PageHeader
        eyebrow="Experiment"
        title="Sensor calibration run #42"
        description="Captures baseline drift across all active sensors."
        actions={
          <>
            <button type="button">Archive</button>
            <button type="button">Duplicate</button>
          </>
        }
        meta={<span>Started 2 hours ago</span>}
      />
    </div>
  ),
}

export const PageContainerDemo: Story = {
  name: 'PageContainer',
  render: () => (
    <PageContainer>
      <div style={{ border: '1px dashed var(--lp-border, #e2e8f0)', padding: 16 }}>
        Content is centered and clamped to the page max width.
      </div>
    </PageContainer>
  ),
}

export const AppHeaderBarDemo: Story = {
  name: 'AppHeaderBar',
  render: () => (
    <div style={{ height: 240, overflowY: 'auto', border: '1px solid var(--lp-border, #e2e8f0)' }}>
      <AppHeaderBar
        title="Task Tracker"
        actions={
          <>
            <button type="button" aria-label="Toggle theme">
              🌓
            </button>
            <button type="button">Log out</button>
          </>
        }
      />
      <div style={{ padding: 16, height: 600 }}>Scroll to see the header stay sticky.</div>
    </div>
  ),
}
