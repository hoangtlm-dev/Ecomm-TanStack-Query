import { Meta, StoryObj } from '@storybook/react'
import { Box } from '@chakra-ui/react'

// Constants
import { banner } from '@app/constants'

// Components
import { Banner } from '@app/components'

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    background: {
      control: 'color'
    }
  },
  decorators: [
    (Story) => (
      <Box mt={4}>
        <Story />
      </Box>
    )
  ]
}

export default meta

type Story = StoryObj<typeof Banner>

export const Default: Story = {
  args: {
    background: 'backgroundPrimary',
    image: banner,
    heading: 'Adidas Men Running Sneakers',
    description: 'Performance and design. Taken right to the edge.'
  }
}
