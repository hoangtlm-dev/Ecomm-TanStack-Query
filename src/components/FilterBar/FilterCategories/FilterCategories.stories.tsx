import { Box } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

// Components
import { FilterCategories } from '@app/components'

// Mocks
import { MOCK_CATEGORIES } from '@app/mocks'

const meta: Meta<typeof FilterCategories> = {
  title: 'Components/FilterBar/FilterCategories',
  component: FilterCategories,
  argTypes: {
    onFilterCategory: {
      table: {
        disable: true
      }
    },
    totalProduct: {
      table: {
        disable: true
      }
    },
    currentSearchParamValue: {
      control: 'text'
    }
  },
  decorators: [
    (Story) => (
      <Box w="270px">
        <Story />
      </Box>
    )
  ]
}

export default meta

type Story = StoryObj<typeof FilterCategories>

const FilterBrandsDecorator = () => {
  const handleFilterCategory = (categoryId: number) => {
    console.log(categoryId)
  }

  const handleCalculateTotalProduct = (categoryId: number) => categoryId

  return (
    <Box w="270px">
      <FilterCategories
        categories={MOCK_CATEGORIES}
        onFilterCategory={handleFilterCategory}
        totalProduct={handleCalculateTotalProduct}
      />
    </Box>
  )
}

export const Default: Story = {
  args: {
    categories: MOCK_CATEGORIES,
    totalProduct: (categoryId: number) => categoryId
  },
  render: () => <FilterBrandsDecorator />
}
