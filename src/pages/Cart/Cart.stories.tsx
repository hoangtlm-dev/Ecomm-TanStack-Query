import { Meta, StoryObj } from '@storybook/react'

// Pages
import { Cart } from '@app/pages'

const meta: Meta = {
  title: 'Pages/Cart',
  component: Cart,
  decorators: [(Story) => <Story />]
}

export default meta

type Story = StoryObj<typeof Cart>

export const Default: Story = {}
