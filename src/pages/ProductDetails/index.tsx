import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  Center,
  Container,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  VStack
} from '@chakra-ui/react'

// Constants
import { ROUTES } from '@app/constants'

// Components
import { ProductInfo, ProductList } from '@app/components'

// Types
import { Product } from '@app/types'

// Hooks
import { useAddToCart, useCartContext, useGetCurrentProduct, useGetProducts } from '@app/hooks'

// Utils
import { getIdFromSlug } from '@app/utils'

const ProductDetails = () => {
  const [currentProductQuantity, setCurrentProductQuantity] = useState(1)
  const { productSlug } = useParams()
  const { onClose: onCloseLoadingModal } = useDisclosure()
  const { state: cartState } = useCartContext()
  const { cartList } = cartState

  const productId = Number(productSlug && getIdFromSlug(productSlug))

  const { isProductListPending, productList } = useGetProducts({ page: 1, limit: 4 })
  const { isCurrentProductPending, currentProduct } = useGetCurrentProduct(productId)
  const { isAddToCartPending, addToCart } = useAddToCart()

  if (!productId) {
    return <Navigate to={ROUTES.NOT_FOUND} />
  }

  const handleAddProductToCart = async (product: Product) => {
    const { id, name, price, currencyUnit, quantity, discount, image } = product

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)
    const cartQuantity = currentProduct?.id === product.id ? currentProductQuantity : 1

    await addToCart({
      id: cartItemFound ? cartItemFound.id : 0,
      productId: id,
      productName: name,
      productPrice: price,
      productQuantity: quantity,
      productCurrencyUnit: currencyUnit,
      productDiscount: discount,
      productImage: image,
      quantity: cartItemFound ? cartItemFound.quantity + cartQuantity : cartQuantity
    })

    onCloseLoadingModal()
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

  return (
    <Container>
      <ProductInfo
        isLoading={isCurrentProductPending}
        product={currentProduct}
        onAddToCart={handleAddProductToCart}
        currentQuantity={currentProductQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onChangeQuantity={handleChangeQuantity}
      />

      <VStack mt={12} spacing={12}>
        <Heading fontSize={{ base: 'textLarge', md: 'headingSmall' }} textTransform="uppercase">
          Related Products
        </Heading>
        <ProductList
          isLoading={isProductListPending}
          products={productList.data}
          listType="grid"
          onAddToCart={handleAddProductToCart}
          gridTemplateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', xl: `repeat(4, 1fr)` }}
          skeletonTemplateColumns={4}
        />
      </VStack>

      {/* Modal for loading indicator */}
      <Modal
        isCentered
        isOpen={isAddToCartPending}
        onClose={onCloseLoadingModal}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="transparent" boxShadow="none">
          <Center>
            <Spinner size="lg" speed="0.8s" color="brand.600" />
          </Center>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ProductDetails
