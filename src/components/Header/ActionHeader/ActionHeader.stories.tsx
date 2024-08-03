import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { ActionHeader } from '@app/components'

const meta: Meta<typeof ActionHeader> = {
  title: 'Components/Header/Action',
  component: ActionHeader,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof ActionHeader>

export const Default: Story = {}
