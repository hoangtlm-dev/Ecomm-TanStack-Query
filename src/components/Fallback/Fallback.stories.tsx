import { Meta, StoryObj } from '@storybook/react'
import { Center } from '@chakra-ui/react'

// Components
import { Fallback } from '@app/components'

const meta: Meta<typeof Fallback> = {
  title: 'Components/Fallback',
  component: Fallback,
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    )
  ]
}

export default meta

type Story = StoryObj<typeof Fallback>

export const Default: Story = {}
