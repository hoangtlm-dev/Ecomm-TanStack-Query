import { Box } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

// Components
import { FilterCategories } from '@app/components'

// Mocks
import { MOCK_CATEGORIES } from '@app/mocks'

const meta: Meta<typeof FilterCategories> = {
  title: 'Components/FilterBar/FilterCategories',
  component: FilterCategories,
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

export const Default: Story = {
  args: {
    categories: MOCK_CATEGORIES
  }
}
