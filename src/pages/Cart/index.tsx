import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Container,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

// Constants
import { MESSAGES } from '@app/constants'

// Components
import { CartList, CheckoutDialog, Invoice } from '@app/components'

// Stores
import { useCartQuantityStore } from '@app/stores'

// Hooks
import { useDebounce, useGetCart, useRemoveFromCart, useUpdateItemInCart } from '@app/hooks'

// Utils
import { calculateProductPrice } from '@app/utils'

const Cart = () => {
  const toast = useToast()
  const { isOpen: isConfirmDeleteOpen, onOpen: onConfirmDeleteOpen, onClose: onConfirmDeleteClose } = useDisclosure()
  const { isOpen: isCheckOutOpen, onOpen: onCheckOutOpen, onClose: onCheckOutClose } = useDisclosure()

  const [selectedCartItemId, setSelectedCartItemId] = useState<number | null>(null)
  const cancelConfirmDeleteRef = useRef<HTMLButtonElement | null>(null)

  const { isCartLoading, cart } = useGetCart()
  const { isRemoveFromCartLoading, removeFromCart } = useRemoveFromCart()
  const { updateItemInCart, isUpdatingItemInCart } = useUpdateItemInCart()

  const { cartInStore, setCartInStore, updateCartInStore } = useCartQuantityStore()

  const debouncedCart = useDebounce(cartInStore)

  // Sync cart in store with cart in cache
  useEffect(() => {
    setCartInStore(cart)
  }, [cart, setCartInStore])

  useEffect(() => {
    const updatedCartItems = debouncedCart.filter((item) => {
      // Find the item need to updated
      const originalItem = cart.find((cartItem) => cartItem.id === item.id)

      // Ensure item exists in the original cart and has a quantity greater than 0
      return originalItem && item.quantity > 0 && item.quantity !== originalItem.quantity
    })

    updatedCartItems.forEach(async (cartItem) => {
      await updateItemInCart({
        cartItemId: cartItem.id,
        cartItemData: cartItem
      })
    })
  }, [debouncedCart, cart, updateItemInCart])

  const handleUpdateQuantityInCart = useCallback(
    (cartItemId: number, action: 'increase' | 'decrease' | 'change', newQuantity?: number) => {
      const cartItemFound = cartInStore.find((item) => item.id === cartItemId)

      if (cartItemFound) {
        let updatedQuantity = cartItemFound.quantity

        switch (action) {
          case 'change':
            if (newQuantity !== undefined) {
              updatedQuantity = newQuantity
            }
            break
          case 'increase':
            updatedQuantity = cartItemFound.quantity + 1
            break
          case 'decrease':
            updatedQuantity = cartItemFound.quantity - 1
            break
          default:
            break
        }

        if (updatedQuantity <= 0) {
          setSelectedCartItemId(cartItemId)
          onConfirmDeleteOpen()
        } else {
          updateCartInStore(cartItemId, action, newQuantity)
        }
      }
    },
    [cartInStore, onConfirmDeleteOpen, updateCartInStore]
  )

  const handleRemoveItemFromCart = useCallback(
    (cartItemId: number) => {
      setSelectedCartItemId(cartItemId)
      onConfirmDeleteOpen()
    },
    [onConfirmDeleteOpen]
  )

  const handleConfirmRemoveItemFromCart = async () => {
    if (selectedCartItemId) {
      await removeFromCart(selectedCartItemId, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: MESSAGES.REMOVE_FROM_CART_SUCCESS,
            status: 'success'
          })
        },
        onError: () => {
          toast({
            title: 'Failed',
            description: MESSAGES.REMOVE_FROM_CART_FAILED,
            status: 'error'
          })
        }
      })
    }
    onConfirmDeleteClose()
  }

  const subTotal = useMemo(
    () =>
      cartInStore.reduce((acc, cartItem) => {
        const { productPrice, productDiscount, quantity } = cartItem

        const totalPriceItemInCart = calculateProductPrice(productPrice, productDiscount, quantity)
        return parseFloat((acc + totalPriceItemInCart).toFixed(2))
      }, 0),
    [cartInStore]
  )

  const handleCheckOut = useCallback(() => {
    onCheckOutOpen()
  }, [onCheckOutOpen])

  const handleCompleteCheckout = () => {
    onCheckOutClose()
    toast({
      title: 'Success',
      description: MESSAGES.CHECKOUT_SUCCESS,
      status: 'success'
    })
  }

  return (
    <Container>
      <CartList
        isLoading={isCartLoading}
        cart={cartInStore}
        isDisabledQuantityChange={isUpdatingItemInCart}
        onRemoveItemFromCart={handleRemoveItemFromCart}
        onUpdateQuantity={handleUpdateQuantityInCart}
      />

      <Flex justifyContent="flex-end" mt={12}>
        <Invoice subTotal={subTotal} onCheckOut={handleCheckOut} />
      </Flex>

      {/* Alert Dialog for Confirm delete */}
      <AlertDialog
        isCentered
        isOpen={isConfirmDeleteOpen}
        leastDestructiveRef={cancelConfirmDeleteRef}
        onClose={onConfirmDeleteClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onConfirmDeleteClose} ref={cancelConfirmDeleteRef} disabled={isRemoveFromCartLoading}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleConfirmRemoveItemFromCart}
                ml={3}
                disabled={isRemoveFromCartLoading}
                isLoading={isRemoveFromCartLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal for Checkout */}
      <Modal isOpen={isCheckOutOpen} onClose={onCheckOutClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={{ base: '300px', sm: '500px', lg: '800px' }}>
          <ModalCloseButton />
          <ModalBody p={10}>
            <CheckoutDialog onCheckOut={handleCompleteCheckout} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Cart
