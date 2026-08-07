import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState } from '../EmptyState.js'
import { ErrorState } from '../ErrorState.js'
import { Loading } from '../Loading.js'

const meta: Meta = {
  title: 'React/Feedback',
}

export default meta
type Story = StoryObj

export const EmptyStatePlain: Story = {
  name: 'EmptyState (plain)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <EmptyState title="No tasks yet" />
    </div>
  ),
}

export const EmptyStateWithDescriptionAndAction: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <EmptyState title="No tasks yet" description="Create your first task to get started.">
        <button type="button">Create task</button>
      </EmptyState>
    </div>
  ),
}

export const EmptyStateWithIcon: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <EmptyState
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          </svg>
        }
        title="No sensors registered"
        description="Register a sensor to start capturing data."
      />
    </div>
  ),
}

export const LoadingWithMessage: Story = {
  name: 'Loading (with message)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Loading message="Fetching tasks…" />
    </div>
  ),
}

export const LoadingWithoutMessage: Story = {
  name: 'Loading (no visible message)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Loading />
    </div>
  ),
}

export const LoadingWithoutSpinner: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <Loading message="Preparing report…" showSpinner={false} />
    </div>
  ),
}

export const ErrorStatePlain: Story = {
  name: 'ErrorState (plain)',
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <ErrorState message="Something went wrong while loading this page." />
    </div>
  ),
}

export const ErrorStateWithRetry: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <ErrorState
        title="Failed to load"
        message="The server did not respond. Check your connection and try again."
        onRetry={() => {}}
        retryLabel="Retry"
      />
    </div>
  ),
}

export const ErrorStateWithAction: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <ErrorState
        title="Space not found"
        message="This space may have been deleted or you no longer have access."
        action={<a href="#">Go back to spaces</a>}
      />
    </div>
  ),
}
