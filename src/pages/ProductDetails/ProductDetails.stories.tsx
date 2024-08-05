import { Meta, StoryObj } from '@storybook/react'

// Pages
import { ProductDetails } from '@app/pages'

const meta: Meta = {
  title: 'Pages/ProductDetails',
  component: ProductDetails,
  decorators: [(Story) => <Story />]
}

export default meta

type Story = StoryObj<typeof ProductDetails>

export const Default: Story = {}
