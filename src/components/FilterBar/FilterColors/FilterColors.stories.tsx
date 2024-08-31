import { Meta, StoryObj } from '@storybook/react'

// Components
import { FilterColors } from '@app/components'

const filteredColors = ['filterBlue', 'filterRed', 'filterBlack', 'filterYellow', 'filterPink', 'filterBlurPink']

const meta: Meta<typeof FilterColors> = {
  title: 'Components/FilterBar/FilterColors',
  component: FilterColors,
  argTypes: {
    colors: {
      control: 'object',
      defaultValue: filteredColors
    }
  }
}

export default meta

type Story = StoryObj<typeof FilterColors>

export const Default: Story = {
  args: {
    colors: filteredColors
  }
}
