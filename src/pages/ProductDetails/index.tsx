import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Heading, VStack } from '@chakra-ui/react'

// Components
import { ProductInfo, ProductList, SkeletonProductInfo } from '@app/components'

// Types
import { Product } from '@app/types'

// Hooks
import { useCartContext, useProductContext } from '@app/hooks'

// Utils
import { getIdFromSlug } from '@app/utils'

const ProductDetails = () => {
  const { productSlug } = useParams()
  const productId = productSlug && Number(getIdFromSlug(productSlug))

  const { state, fetchProducts, fetchCurrentProduct } = useProductContext()
  const { state: cartState, addToCart } = useCartContext()
  const { data, currentProduct, isFetching, isCurrentProductFetching } = state

  const productQuantityRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (productId) {
      fetchCurrentProduct(productId)
    }
  }, [productId, fetchCurrentProduct])

  useEffect(() => {
    if (currentProduct && productId) {
      fetchProducts({ id_ne: productId, limit: 4, categoryId: currentProduct.categoryId })
    }
  }, [currentProduct, productId, fetchProducts])

  const handleAddProductToCart = (product: Product) => {
    const { id, name, price, unitPrice, quantity, discount, image } = product

    const cartItemFound = cartState.data.data.find((cart) => cart.productId === id)
    const cartQuantity =
      product.id === currentProduct?.id && productQuantityRef.current ? Number(productQuantityRef.current.value) : 1

    addToCart({
      id: cartItemFound ? cartItemFound.id : 0,
      productId: id,
      productName: name,
      productPrice: price,
      productQuantity: quantity,
      productUnitPrice: unitPrice,
      productDiscount: discount,
      productImage: image,
      quantity: cartItemFound ? cartItemFound.quantity + cartQuantity : cartQuantity
    })
  }

  if (isCurrentProductFetching) {
    return (
      <Container>
        <SkeletonProductInfo />
      </Container>
    )
  }

  return (
    <Container>
      {currentProduct && (
        <ProductInfo product={currentProduct} onAddToCart={handleAddProductToCart} ref={productQuantityRef} />
      )}
      <VStack mt={12} spacing={12}>
        <Heading fontSize={{ base: 'textLarge', md: 'headingSmall' }} textTransform="uppercase">
          Related Products
        </Heading>
        <ProductList
          isFetching={isFetching}
          products={data.data}
          listType="grid"
          onAddToCart={handleAddProductToCart}
          gridTemplateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', xl: `repeat(4, 1fr)` }}
        />
      </VStack>
    </Container>
  )
}

export default ProductDetails
