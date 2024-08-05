import { Box, ChakraProvider, Container, Heading, Text } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Constants
import { ROUTES } from '@app/constants'
// Themes
import { theme } from '@app/themes'

/// Layouts
import { MainLayout } from '@app/layouts'

// Pages
import { Cart, Home, ProductDetails } from '@app/pages'

const PlaceholderPage = ({ pageName = 'Placeholder' }: { pageName?: string }) => (
  <Container>
    <Box py="6">
      <Heading>{pageName}</Heading>
      <Text mt="2">🔥 The {pageName} page! Coming soon!</Text>
    </Box>
  </Container>
)

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.ROOT} element={<Home />} />
            <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.NOT_FOUND} element={<PlaceholderPage pageName="Not found" />} />

            {/* Menus */}
            <Route path={ROUTES.BAGS} element={<PlaceholderPage pageName="Bags" />} />
            <Route path={ROUTES.SNEAKERS} element={<PlaceholderPage pageName="Sneakers" />} />
            <Route path={ROUTES.BELT} element={<PlaceholderPage pageName="Belt" />} />
            <Route path={ROUTES.CONTACT} element={<PlaceholderPage pageName="Contact" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
