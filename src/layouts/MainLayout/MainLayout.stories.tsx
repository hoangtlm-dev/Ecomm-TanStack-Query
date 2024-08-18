import { Meta, StoryObj } from '@storybook/react'
import { Center, Container, Heading } from '@chakra-ui/react'

// Layouts
import { MainLayout } from '@app/layouts'
import { BrowserRouter } from 'react-router-dom'

const meta: Meta = {
  title: 'Layouts/Main',
  component: MainLayout,
  decorators: [
    (Story, context) => {
      const Router = context.parameters?.router || BrowserRouter
      return (
        <Router>
          <Container>
            <Story />
            <Center>
              <Heading>This is the content of a page</Heading>
            </Center>
          </Container>
        </Router>
      )
    }
  ]
}

export default meta

type Story = StoryObj<typeof MainLayout>

export const Default: Story = {}
