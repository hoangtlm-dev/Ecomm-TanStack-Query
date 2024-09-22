import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Heading, useDisclosure, useToast, VStack } from '@chakra-ui/react'

// Constants
import { MESSAGES } from '@app/constants'

// Components
import { ProductInfo, ProductList } from '@app/components'

// Types
import { Product } from '@app/types'

// Hooks
import { useAddToCart, useGetCart, useGetCurrentProduct, useGetProducts } from '@app/hooks'

// Stores
import { useProductQuantityStore } from '@app/stores'

// Utils
import { getIdFromSlug } from '@app/utils'

const ProductDetails = () => {
  const { productSlug } = useParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { onClose: onCloseLoadingModal } = useDisclosure()
  const toast = useToast()

  const productId = Number(productSlug && getIdFromSlug(productSlug))
  const { currentProductQuantity, increaseQuantity, decreaseQuantity, setQuantity } = useProductQuantityStore()
  const { isCurrentProductLoading, currentProduct } = useGetCurrentProduct(productId)
  const { isProductListLoading, productList } = useGetProducts({ page: 1, limit: 4, id_ne: productId })
  const { isAddToCartLoading, addToCart } = useAddToCart()
  const { cart } = useGetCart()

  const addProductToCart = useCallback(
    async (product: Product, cartQuantity: number) => {
      const { id, name, price, currencyUnit, quantity, discount, image } = product
      const cartItemFound = cart.find((cartItem) => cartItem.productId === id)

      const cartData = {
        // If the item  already exists in the cart, use its id to update the data. Otherwise, use 0 to create a new item in the cart
        id: cartItemFound ? cartItemFound.id : 0,
        productId: id,
        productName: name,
        productPrice: price,
        productQuantity: quantity,
        productCurrencyUnit: currencyUnit,
        productDiscount: discount,
        productImage: image,
        // If the item already exists in the cart, increase its quantity by the new quantity. Otherwise, set the quantity to the initial quantity.
        quantity: cartItemFound ? cartItemFound.quantity + cartQuantity : cartQuantity
      }

      await addToCart(cartData, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: MESSAGES.ADD_TO_CART_SUCCESS,
            status: 'success'
          })
        },
        onError: () => {
          toast({
            title: 'Failed',
            description: MESSAGES.ADD_TO_CART_FAILED,
            status: 'error'
          })
        }
      })

      onCloseLoadingModal()
    },
    [addToCart, cart, onCloseLoadingModal, toast]
  )

  const handleLoadingAddToCart = useCallback(
    (productId: number) => {
      if (selectedProduct?.id === productId && isAddToCartLoading) {
        return true
      }
      return false
    },
    [isAddToCartLoading, selectedProduct?.id]
  )

  const handleAddProductToCart = useCallback(() => {
    if (currentProduct) {
      setSelectedProduct(currentProduct)

      const cartQuantity = currentProductQuantity
      addProductToCart(currentProduct, cartQuantity)
    }
  }, [addProductToCart, currentProduct, currentProductQuantity])

  const handleAddProductToCartInList = useCallback(
    (product: Product) => {
      setSelectedProduct(product)

      const cartQuantity = 1
      addProductToCart(product, cartQuantity)
    },
    [addProductToCart]
  )

  return (
    <Container>
      <ProductInfo
        isLoading={isCurrentProductLoading}
        product={currentProduct}
        currentQuantity={currentProductQuantity}
        isAddingToCart={handleLoadingAddToCart}
        onAddToCart={handleAddProductToCart}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onChangeQuantity={setQuantity}
      />
      <VStack mt={12} spacing={12}>
        <Heading fontSize={{ base: 'textLarge', md: 'headingSmall' }} textTransform="uppercase">
          Related Products
        </Heading>
        <ProductList
          isLoading={isProductListLoading}
          products={productList}
          gridTemplateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
          skeletonTemplateColumns={4}
          isAddingToCart={handleLoadingAddToCart}
          onAddToCart={handleAddProductToCartInList}
        />
      </VStack>
    </Container>
  )
}

export default ProductDetails
