import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ProductProvider, CategoryProvider } from '@app/contexts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CategoryProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CategoryProvider>
  </React.StrictMode>
)
