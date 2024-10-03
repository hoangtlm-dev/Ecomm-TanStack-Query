import { ChakraProvider, Container, Heading, VStack, Text, Link } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes, Link as ReactRouterLink } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Constants
import { ROUTES } from '@app/constants'

// Themes
import { theme } from '@app/themes'

// Components
import { Fallback } from '@app/components'

// Layouts
import { MainLayout } from '@app/layouts'

// Pages
import { Cart, Home, ProductDetails, NotFound } from '@app/pages'

const PlaceholderPage = ({ pageName = 'Placeholder' }: { pageName?: string }) => (
  <Container>
    <VStack>
      <Heading>{pageName}</Heading>
      <Text mt="2">🔥 The {pageName} page! Coming soon!</Text>
      <Link as={ReactRouterLink} to={ROUTES.ROOT} color="textBlue" fontSize="textMedium">
        Back to Home
      </Link>
    </VStack>
  </Container>
)

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'bottom-right', isClosable: true, duration: 3000 } }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route
                path={ROUTES.ROOT}
                element={
                  <ErrorBoundary fallback={<Fallback />}>
                    <Home />
                  </ErrorBoundary>
                }
              />
              <Route
                path={ROUTES.PRODUCT_DETAILS}
                element={
                  <ErrorBoundary fallback={<Fallback />}>
                    <ProductDetails />
                  </ErrorBoundary>
                }
              />
              <Route
                path={ROUTES.CART}
                element={
                  <ErrorBoundary fallback={<Fallback />}>
                    <Cart />
                  </ErrorBoundary>
                }
              />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />

              {/* Menus */}
              <Route path={ROUTES.BAGS} element={<PlaceholderPage pageName="Bags" />} />
              <Route path={ROUTES.SNEAKERS} element={<PlaceholderPage pageName="Sneakers" />} />
              <Route path={ROUTES.BELT} element={<PlaceholderPage pageName="Belt" />} />
              <Route path={ROUTES.CONTACT} element={<PlaceholderPage pageName="Contact" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
