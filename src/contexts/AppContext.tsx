import { ReactNode } from 'react'

// Contexts
import { CartProvider, CategoryProvider, ProductProvider } from '@app/contexts'

interface IAppProvidersProps {
  children: ReactNode
}

const AppProviders = ({ children }: IAppProvidersProps) => {
  return (
    <CartProvider>
      <CategoryProvider>
        <ProductProvider>{children}</ProductProvider>
      </CategoryProvider>
    </CartProvider>
  )
}

export default AppProviders
