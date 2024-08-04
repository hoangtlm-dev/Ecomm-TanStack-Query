import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { Product } from '@app/types'

// Components
import { ProductList } from '@app/components'

// Mocks
import { MOCK_PRODUCT } from '@app/mocks'

const meta: Meta<typeof ProductList> = {
  title: 'Components/Product/ProductList',
  component: ProductList,
  argTypes: {
    listType: {
      control: 'radio'
    }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof ProductList>

const mockProducts: Product[] = Array.from({ length: PAGINATION.DEFAULT_ITEMS_PER_PAGE }, (_, index) => ({
  ...MOCK_PRODUCT,
  id: index + 1
}))

export const GridView: Story = {
  args: {
    isFetching: false,
    products: mockProducts,
    listType: 'grid'
  }
}

export const ListView: Story = {
  args: {
    isFetching: false,
    products: mockProducts,
    listType: 'list'
  }
}

export const GridFetching: Story = {
  args: {
    isFetching: true,
    listType: 'grid'
  }
}

export const ListFetching: Story = {
  args: {
    isFetching: true,
    listType: 'list'
  }
}
