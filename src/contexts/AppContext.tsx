import { ReactNode } from 'react'

// Contexts
import { CartProvider, ProductProvider } from '@app/contexts'

interface IAppProvidersProps {
  children: ReactNode
}

const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <CartProvider>
      <ProductProvider>{children}</ProductProvider>
    </CartProvider>
  )
}

export default AppProviders
