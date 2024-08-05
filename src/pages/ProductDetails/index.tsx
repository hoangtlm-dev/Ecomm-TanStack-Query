import { Container, Grid, Heading, VStack } from '@chakra-ui/react'

// Components
import { ProductInfo, ProductList } from '@app/components'

// Mocks
import { MOCK_PRODUCT, MOCK_PRODUCTS } from '@app/mocks'

// Types
import { Product } from '@app/types'

const ProductDetails = () => {
  const handleAddProductToCart = (product: Product, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Todo: Handle logic for adding product to cart
    event && event.preventDefault()
    console.log(product)
  }

  return (
    <Container>
      <ProductInfo product={MOCK_PRODUCT} onAddToCart={handleAddProductToCart} />
      <VStack mt={12} spacing={12}>
        <Heading fontSize={{ base: 'textLarge', md: 'headingSmall' }} textTransform="uppercase">
          Related Products
        </Heading>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', xl: `repeat(4, 1fr)` }} gap={4}>
          <ProductList
            isFetching={false}
            products={MOCK_PRODUCTS(4)}
            listType="grid"
            onAddToCart={handleAddProductToCart}
          />
        </Grid>
      </VStack>
    </Container>
  )
}

export default ProductDetails
