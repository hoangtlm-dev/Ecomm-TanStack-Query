import { useRef, useState } from 'react'
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

  const { isCartListLoading, cartList } = useGetCart()
  const { isRemoveFromCartPending, removeFromCart } = useRemoveFromCart()
  const { updateItemInCart } = useUpdateItemInCart()

  const handleUpdateQuantityInCart = async (
    cartId: number,
    action: 'increase' | 'decrease' | 'change',
    newQuantity?: number
  ) => {
    const cartItemFound = cartList.find((cart) => (cart.id = cartId))

    if (!cartItemFound) return

    switch (action) {
      case 'decrease':
        await updateItemInCart({ cartId, cartData: { ...cartItemFound, quantity: cartItemFound.quantity - 1 } })
        break
      case 'increase':
        await updateItemInCart({ cartId, cartData: { ...cartItemFound, quantity: cartItemFound.quantity + 1 } })
        break
      case 'change':
        await updateItemInCart({ cartId, cartData: { ...cartItemFound, quantity: newQuantity ?? 0 } })
        break
    }
  }

  const handleRemoveItemFromCart = (cartId: number) => {
    setSelectedCartId(cartId)
    onConfirmDeleteOpen()
  }

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

  const subTotal = cartList.reduce((acc, cartItem) => {
    const { productPrice, productDiscount, quantity } = cartItem

    const totalPriceItemInCart = calculateProductPrice(productPrice, productDiscount, quantity)
    return parseFloat((acc + totalPriceItemInCart).toFixed(2))
  }, 0)

  const handleCheckOut = () => {
    onCheckOutOpen()
  }

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
        isLoading={isCartListLoading}
        cart={cartList}
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
              <Button onClick={onConfirmDeleteClose} ref={cancelConfirmDeleteRef} disabled={isRemoveFromCartPending}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleConfirmRemoveItemFromCart}
                ml={3}
                disabled={isRemoveFromCartPending}
                isLoading={isRemoveFromCartPending}
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
