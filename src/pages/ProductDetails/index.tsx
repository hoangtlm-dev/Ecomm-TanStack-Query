import { useEffect, useState } from 'react'
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

  const toast = useToast()

  const [currentProductQuantity, setCurrentProductQuantity] = useState(1)

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

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)
    const cartQuantity = currentProduct?.id === product.id ? currentProductQuantity : 1
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

  const handleIncreaseQuantity = () => {
    if (currentProductQuantity < (currentProduct?.quantity || 1)) {
      setCurrentProductQuantity(currentProductQuantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (currentProductQuantity > 1) {
      setCurrentProductQuantity(currentProductQuantity - 1)
    }
  }

  const handleChangeQuantity = (value: number) => {
    setCurrentProductQuantity(value)
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
        <ProductInfo
          product={currentProduct}
          onAddToCart={handleAddProductToCart}
          currentQuantity={currentProductQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onChangeQuantity={handleChangeQuantity}
        />
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
