import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Constants
import { MESSAGES } from '@app/constants'

// Contexts
import { AppProviders } from '@app/contexts'

const domNode = document.getElementById('root')

if (domNode) {
  createRoot(domNode).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>
  )
} else {
  throw new Error(MESSAGES.DOM_NOT_FOUND)
}
