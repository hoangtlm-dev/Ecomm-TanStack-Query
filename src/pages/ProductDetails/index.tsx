import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Center,
  Container,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'

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
  const [currentProductQuantity, setCurrentProductQuantity] = useState(1)
  const { productSlug } = useParams()

  const toast = useToast()
  const { isOpen: isOpenLoadingModal, onOpen: onOpenLoadingModal, onClose: onCloseLoadingModal } = useDisclosure()

  const { state: productState, fetchProducts, fetchCurrentProduct } = useProductContext()
  const { state: cartState, addToCart } = useCartContext()
  const { productList, currentProduct, isProductListLoading, isCurrentProductLoading } = productState
  const { cartList, isAddToCartLoading } = cartState

  const productId = productSlug && Number(getIdFromSlug(productSlug))

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

  useEffect(() => {
    if (isAddToCartLoading) {
      onOpenLoadingModal()
    }
  }, [isAddToCartLoading, onOpenLoadingModal])

  const handleAddProductToCart = async (product: Product) => {
    const { id, name, price, unitPrice, quantity, discount, image } = product

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)
    const cartQuantity = currentProduct?.id === product.id ? currentProductQuantity : 1

    try {
      await addToCart({
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
        title: 'Success',
        description: MESSAGES.ADD_PRODUCT_SUCCESS,
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Failed',
        description: String(error),
        status: 'error'
      })
    }

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
      {isCurrentProductLoading ? (
        <SkeletonProductInfo />
      ) : (
        currentProduct && (
          <ProductInfo
            product={currentProduct}
            onAddToCart={handleAddProductToCart}
            currentQuantity={currentProductQuantity}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onChangeQuantity={handleChangeQuantity}
          />
        )
      )}

      <VStack mt={12} spacing={12}>
        <Heading fontSize={{ base: 'textLarge', md: 'headingSmall' }} textTransform="uppercase">
          Related Products
        </Heading>
        <ProductList
          isLoading={isProductListLoading}
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
        isOpen={isOpenLoadingModal}
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
