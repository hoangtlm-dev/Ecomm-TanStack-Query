import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Heading, useToast, VStack } from '@chakra-ui/react'

// Constants
import { MESSAGES } from '@app/constants'

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
  const { productList, currentProduct, isProductListFetching, isCurrentProductFetching } = state
  const { cartList } = cartState

  const currentProductQuantityRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

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

  console.log(currentProductQuantityRef.current && Number(currentProductQuantityRef.current.value))

  const handleAddProductToCart = (product: Product) => {
    const { id, name, price, unitPrice, quantity, discount, image } = product

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)
    const cartQuantity =
      product.id === currentProduct?.id && currentProductQuantityRef.current
        ? Number(currentProductQuantityRef.current.value)
        : 1

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

    toast({
      position: 'bottom-right',
      title: 'Success',
      description: MESSAGES.ADD_PRODUCT_SUCCESS,
      status: 'success',
      duration: 3000,
      isClosable: true
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
        <ProductInfo product={currentProduct} onAddToCart={handleAddProductToCart} ref={currentProductQuantityRef} />
      )}

      <VStack mt={12} spacing={12}>
        <Heading fontSize={{ base: 'textLarge', md: 'headingSmall' }} textTransform="uppercase">
          Related Products
        </Heading>
        <ProductList
          isFetching={isProductListFetching}
          products={productList.data}
          listType="grid"
          onAddToCart={handleAddProductToCart}
          gridTemplateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', xl: `repeat(4, 1fr)` }}
        />
      </VStack>
    </Container>
  )
}

export default ProductDetails
