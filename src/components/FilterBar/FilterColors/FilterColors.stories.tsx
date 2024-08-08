import { Meta, StoryObj } from '@storybook/react'

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
    }
  }
}

export default meta

type Story = StoryObj<typeof FilterColors>

const filteredColor = ['filterBlue', 'filterRed', 'filterBlack', 'filterYellow', 'filterPink', 'filterBlurPink']

export const Default: Story = {
  args: {
    colors: filteredColor
  }
}
