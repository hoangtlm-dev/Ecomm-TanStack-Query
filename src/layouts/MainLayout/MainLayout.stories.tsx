import { Meta, StoryObj } from '@storybook/react'

// Layouts
import { MainLayout } from '@app/layouts'

const meta: Meta = {
  title: 'Layouts/Main',
  component: MainLayout,
  decorators: [(Story) => <Story />]
}

export default meta

type Story = StoryObj<typeof MainLayout>

export const Default: Story = {}
