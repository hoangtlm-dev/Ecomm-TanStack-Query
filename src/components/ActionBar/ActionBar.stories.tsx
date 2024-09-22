import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import ActionBar from '@app/components/ActionBar'

const meta: Meta<typeof ActionBar> = {
  title: 'Components/ActionBar',
  component: ActionBar,
  argTypes: {
    totalItems: { control: 'number' },
    sortOptions: {
      control: 'object',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' }
      }
    },
    showOptions: {
      control: 'object',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' }
      }
    },
    listView: {
      control: 'radio',
      options: ['grid', 'list']
    }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof ActionBar>

export const Default: Story = {
  args: {
    totalItems: 13,
    sortOptions: ['name', 'price'],
    showOptions: [12, 14, 16, 18, 20],
    listView: 'grid'
  }
}
