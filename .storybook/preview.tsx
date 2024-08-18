import React from 'react'
import type { Preview } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'

// Contexts
import { AppProviders } from '../src/contexts'

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
    (Story) => {
      return (
        <AppProviders>
          <ChakraProvider
            theme={theme}
            toastOptions={{ defaultOptions: { position: 'bottom-right', isClosable: true, duration: 3000 } }}
          >
            <Story />
          </ChakraProvider>
        </AppProviders>
      )
    }
  ],
  tags: ['autodocs']
}

export default preview
