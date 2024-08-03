import React from 'react'
import type { Preview } from '@storybook/react'
import { Center, ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

// Theme
import { theme } from '../src/themes'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story, context) => {
      const Router = context.parameters?.router || BrowserRouter
      return (
        <ChakraProvider theme={theme}>
          <Router>
            <Center>
              <Story />
            </Center>
          </Router>
        </ChakraProvider>
      )
    }
  ],
  tags: ['autodocs']
}

export default preview
