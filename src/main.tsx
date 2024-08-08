import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ProductProvider, CategoryProvider, CartProvider } from '@app/contexts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <CategoryProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CategoryProvider>
    </CartProvider>
  </React.StrictMode>
)
