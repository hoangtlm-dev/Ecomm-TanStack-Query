import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { ProductList } from '@app/components'

// Mocks
import { MOCK_PRODUCTS } from '@app/mocks'

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

export const GridView: Story = {
  args: {
    isFetching: false,
    products: MOCK_PRODUCTS,
    listType: 'grid'
  }
}

export const ListView: Story = {
  args: {
    isFetching: false,
    products: MOCK_PRODUCTS,
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
