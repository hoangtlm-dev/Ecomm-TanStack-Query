import { Meta, StoryObj } from '@storybook/react'

// Types
import { Product } from '@app/types'

// Components
import { ProductItem } from '@app/components'

// Mocks
import { MOCK_PRODUCT } from '@app/mocks'

const meta: Meta<typeof ProductItem> = {
  title: 'Components/Product/ProductItem',
  component: ProductItem,
  decorators: [(Story) => <Story />],
  argTypes: {
    product: {
      control: 'object'
    },
    listType: {
      control: { type: 'radio', options: ['grid', 'list'] }
    },
    onAddToCart: { action: 'added to cart' }
  }
}

export default meta

type Story = StoryObj<typeof ProductItem>

const mockProduct: Product = MOCK_PRODUCT

export const GridView: Story = {
  args: {
    product: mockProduct,
    listType: 'grid'
  }
}

export const ListView: Story = {
  args: {
    product: mockProduct,
    listType: 'list'
  }
}

export const NoDiscountedProduct: Story = {
  args: {
    product: {
      ...mockProduct,
      discount: 0,
      isHotDeal: false,
      price: 500
    },
    listType: 'grid'
  }
}

export const DiscountedProduct: Story = {
  args: {
    product: {
      ...mockProduct,
      discount: 20,
      price: 500
    },
    listType: 'grid'
  }
}

export const NoRatingProduct: Story = {
  args: {
    product: {
      ...mockProduct,
      ratingStar: 0,
      isHotDeal: false
    },
    listType: 'list'
  }
}

export const HotDealProduct: Story = {
  args: {
    product: {
      ...mockProduct,
      isHotDeal: true
    },
    listType: 'grid'
  }
}
