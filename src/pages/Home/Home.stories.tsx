import { Meta, StoryObj } from '@storybook/react'

// Pages
import { Home } from '@app/pages'

const meta: Meta = {
  title: 'Pages/Home',
  component: Home,
  decorators: [(Story) => <Story />]
}

export default meta

type Story = StoryObj<typeof Home>

export const Default: Story = {}
