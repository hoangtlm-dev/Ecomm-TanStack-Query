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
    listView: {
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
    isLoading: false,
    products: MOCK_PRODUCTS(),
    listView: 'grid'
  }
}

export const ListView: Story = {
  args: {
    isLoading: false,
    products: MOCK_PRODUCTS(),
    listView: 'list'
  }
}

export const GridFetching: Story = {
  args: {
    isLoading: true,
    listView: 'grid'
  }
}

export const ListFetching: Story = {
  args: {
    isLoading: true,
    listView: 'list'
  }
}
