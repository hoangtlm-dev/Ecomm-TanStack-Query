import { Center } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

// Components
import { SkeletonProductItem } from '@app/components'

const meta: Meta<typeof SkeletonProductItem> = {
  title: 'Components/Skeleton/SkeletonProductItem',
  component: SkeletonProductItem,
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    )
  ],
  argTypes: {
    listView: {
      control: 'radio'
    }
  }
}

export default meta

type Story = StoryObj<typeof SkeletonProductItem>

export const Grid: Story = {
  args: {
    listView: 'grid'
  }
}

export const List: Story = {
  args: {
    listView: 'list'
  }
}
