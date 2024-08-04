import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Box } from '@chakra-ui/react'

// Components
import { FilterColors } from '@app/components'

const meta: Meta<typeof FilterColors> = {
  title: 'Components/FilterBar/FilterColors',
  component: FilterColors,
  argTypes: {
    colors: {
      control: 'object',
      defaultValue: ['filterBlue', 'filterRed', 'filterBlack', 'filterYellow', 'filterPink', 'filterBlurPink']
    },
    activeColor: {
      control: 'text'
    },
    onFilterColors: {
      table: {
        disable: true
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof FilterColors>

const filteredColor = ['filterBlue', 'filterRed', 'filterBlack', 'filterYellow', 'filterPink', 'filterBlurPink']

const FilterColorsDecorator = () => {
  const [activeColor, setActiveColor] = useState('')

  const handleFilterColors = (color: string) => {
    setActiveColor(color)
  }

  return (
    <Box w="270px">
      <FilterColors colors={filteredColor} onFilterColors={handleFilterColors} activeColor={activeColor} />
    </Box>
  )
}

export const Default: Story = {
  args: {
    colors: filteredColor
  },
  render: () => FilterColorsDecorator()
}
