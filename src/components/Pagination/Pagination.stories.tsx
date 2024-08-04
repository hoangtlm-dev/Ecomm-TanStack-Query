import { useState } from 'react'
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
    },
    onPageChange: {
      table: {
        disable: true
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Pagination>

const PaginationDecorator = ({
  totalItems,
  itemsPerPage,
  currentPage
}: {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}) => {
  const [current, setCurrent] = useState(currentPage)

  const handlePageChange = (newPage: number) => {
    setCurrent(newPage)
  }

  return (
    <Pagination
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      currentPage={current}
      onPageChange={handlePageChange}
    />
  )
}

export const Default: Story = {
  args: {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1
  },
  render: (args) => <PaginationDecorator {...args} />
}
