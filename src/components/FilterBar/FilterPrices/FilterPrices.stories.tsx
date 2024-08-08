import { Meta, StoryObj } from '@storybook/react'
import { Box } from '@chakra-ui/react'

// Components
import { FilterPrices } from '@app/components'

const meta: Meta<typeof FilterPrices> = {
  title: 'Components/FilterBar/FilterPrices',
  component: FilterPrices,
  decorators: [
    (Story) => (
      <Box w="270px">
        <Story />
      </Box>
    )
  ]
}

export default meta

type Story = StoryObj<typeof FilterPrices>

export const Default: Story = {
  args: {
    minPrice: 13.99,
    maxPrice: 93.33
  }
}
