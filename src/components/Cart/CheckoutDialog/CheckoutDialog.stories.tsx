import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { CheckoutDialog } from '@app/components'

const meta: Meta<typeof CheckoutDialog> = {
  title: 'Components/Cart/CheckoutDialog',
  component: CheckoutDialog,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof CheckoutDialog>

export const Default: Story = {}
