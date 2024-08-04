import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

// Types
import { Category } from '@app/types'

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
  const [activeCategory, setActiveCategory] = useState(MOCK_CATEGORIES[0])

  const handleFilterCategory = (category: Category) => {
    setActiveCategory(category)
  }

  const handleCalculateTotalProduct = (categoryId: number) => categoryId

  return (
    <Box w="270px">
      <FilterCategories
        categories={MOCK_CATEGORIES}
        onFilterCategory={handleFilterCategory}
        totalProduct={handleCalculateTotalProduct}
        currentSearchParamValue={activeCategory.name}
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
