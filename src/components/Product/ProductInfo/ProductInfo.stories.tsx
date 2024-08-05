import { Meta, StoryObj } from '@storybook/react'

// Types
import { Product } from '@app/types'

// Components
import { ProductInfo } from '@app/components'

// Mocks
import { MOCK_PRODUCT } from '@app/mocks'

const meta: Meta<typeof ProductInfo> = {
  title: 'Components/Product/ProductInfo',
  component: ProductInfo,
  decorators: [(Story) => <Story />],
  argTypes: {
    product: {
      control: 'object'
    }
  }
}

export default meta

type Story = StoryObj<typeof ProductInfo>

const mockProduct: Product = MOCK_PRODUCT

export const Default: Story = {
  args: {
    product: mockProduct
  }
}

export const SoldOut: Story = {
  args: {
    product: {
      ...mockProduct,
      quantity: 0
    }
  }
}

export const NoDiscount: Story = {
  args: {
    product: {
      ...mockProduct,
      discount: 0
    }
  }
}
