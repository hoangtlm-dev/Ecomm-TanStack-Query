import { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

// Pages
import { Home } from '@app/pages'

const meta: Meta = {
  title: 'Pages/Home',
  component: Home,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
}

export default meta

type Story = StoryObj<typeof Home>

export const Default: Story = {}
