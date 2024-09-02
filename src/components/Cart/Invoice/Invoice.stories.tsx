import { Meta, StoryObj } from '@storybook/react'
import { Center, Container } from '@chakra-ui/react'

// Components
import { Invoice } from '@app/components'

const meta: Meta<typeof Invoice> = {
  title: 'Components/Cart/Invoice',
  component: Invoice,
  decorators: [
    (Story) => (
      <Container>
        <Center>
          <Story />
        </Center>
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof Invoice>

export const Default: Story = {
  args: {
    subTotal: 499.99
  }
}

export const WithCoupon: Story = {
  args: {
    subTotal: 499.99,
    coupon: '#DE150035'
  }
}

export const WithDifferentCurrency: Story = {
  args: {
    subTotal: 499.99,
    currencyUnit: '€'
  }
}

export const WithShippingFee: Story = {
  args: {
    subTotal: 499.99,
    shippingFee: 20
  }
}
