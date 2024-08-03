import { ReactNode } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

// Components
import { Navbar } from '@app/components'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Header/Navbar',
  component: Navbar,
  parameters: {
    router: ({ children }: { children: ReactNode }) => <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
  }
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Default: Story = {}
