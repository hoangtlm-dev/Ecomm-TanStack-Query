import { Meta, StoryObj } from '@storybook/react'

// Components
import { Pagination } from '@app/components'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: {
      control: {
        type: 'number'
      },
      defaultValue: 100
    },
    itemsPerPage: {
      control: {
        type: 'number'
      },
      defaultValue: 10
    },
    currentPage: {
      control: {
        type: 'number'
      },
      defaultValue: 1
    }
  }
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1
  }
}
