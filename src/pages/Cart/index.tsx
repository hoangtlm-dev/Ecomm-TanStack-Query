import { useCallback, useMemo, useRef, useState } from 'react'
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

// Hooks
import { useGetCart, useRemoveFromCart, useUpdateItemInCart } from '@app/hooks'

// Utils
import { calculateProductPrice } from '@app/utils'

const Cart = () => {
  const toast = useToast()
  const { isOpen: isConfirmDeleteOpen, onOpen: onConfirmDeleteOpen, onClose: onConfirmDeleteClose } = useDisclosure()
  const { isOpen: isCheckOutOpen, onOpen: onCheckOutOpen, onClose: onCheckOutClose } = useDisclosure()

  const [selectedCartId, setSelectedCartId] = useState<number | null>(null)

  const cancelConfirmDeleteRef = useRef<HTMLButtonElement | null>(null)

  const { isCartLoading, cart } = useGetCart()
  const { isRemoveFromCartLoading, removeFromCart } = useRemoveFromCart()
  const { isUpdateItemInCartLoading, updateItemInCart } = useUpdateItemInCart()

  const handleUpdateQuantityInCart = useCallback(
    async (cartItemId: number, action: 'increase' | 'decrease' | 'change', newQuantity?: number) => {
      const cartItemFound = cart.find((cartItem) => cartItem.id === cartItemId)

      if (!cartItemFound) return

      if (action === 'decrease' && cartItemFound.quantity === 1) {
        setSelectedCartId(cartItemId)
        onConfirmDeleteOpen()
        return
      }

      switch (action) {
        case 'decrease':
          await updateItemInCart({
            cartItemId,
            cartItemData: { ...cartItemFound, quantity: cartItemFound.quantity - 1 }
          })
          break
        case 'increase':
          await updateItemInCart({
            cartItemId,
            cartItemData: { ...cartItemFound, quantity: cartItemFound.quantity + 1 }
          })
          break
        case 'change':
          await updateItemInCart({ cartItemId, cartItemData: { ...cartItemFound, quantity: newQuantity ?? 0 } })
          break
      }
    },
    [cart, updateItemInCart, onConfirmDeleteOpen]
  )

  const handleRemoveItemFromCart = useCallback(
    (cartId: number) => {
      setSelectedCartId(cartId)
      onConfirmDeleteOpen()
    },
    [onConfirmDeleteOpen]
  )

  const handleConfirmRemoveItemFromCart = async () => {
    if (selectedCartId) {
      await removeFromCart(selectedCartId, {
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
      cart.reduce((acc, cartItem) => {
        const { productPrice, productDiscount, quantity } = cartItem

        const totalPriceItemInCart = calculateProductPrice(productPrice, productDiscount, quantity)
        return parseFloat((acc + totalPriceItemInCart).toFixed(2))
      }, 0),
    [cart]
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
        cart={cart}
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
              <Button
                onClick={onConfirmDeleteClose}
                ref={cancelConfirmDeleteRef}
                disabled={isRemoveFromCartLoading}
                isLoading={isUpdateItemInCartLoading}
              >
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
