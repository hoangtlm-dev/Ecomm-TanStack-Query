import { Meta, StoryObj } from '@storybook/react'

// Components
import { ProductRating } from '@app/components'

const meta: Meta<typeof ProductRating> = {
  title: 'Components/Product/ProductRating',
  component: ProductRating,
  argTypes: {
    ratingNumber: {
      control: { type: 'number', min: 0, max: 5 },
      defaultValue: 3
    }
  },
  decorators: [(Story) => <Story />]
}

export default meta

type Story = StoryObj<typeof ProductRating>

export const Default: Story = {}
