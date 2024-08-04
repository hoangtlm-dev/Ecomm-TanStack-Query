import { Meta, StoryObj } from '@storybook/react'

// Components
import { ProductListEmpty } from '@app/components'

const meta: Meta<typeof ProductListEmpty> = {
  title: 'Components/Product/ProductListEmpty',
  component: ProductListEmpty,
  decorators: [(Story) => <Story />]
}

export default meta

type Story = StoryObj<typeof ProductListEmpty>

export const Default: Story = {}
