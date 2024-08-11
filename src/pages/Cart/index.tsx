import { useEffect, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Container,
  useDisclosure
} from '@chakra-ui/react'

// Components
import { CartList } from '@app/components'

// Hooks
import { useCartContext } from '@app/hooks'

const Cart = () => {
  const { state: cartState, fetchCarts, removeFromCart, increaseQuantity, decreaseQuantity } = useCartContext()
  const { isFetching, cartList } = cartState

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null)

  const cancelRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

  const handleRemoveItemFromCart = (cartId: number) => {
    setSelectedCartId(cartId)
    onOpen()
  }

  const handleConfirmRemoveItemFromCart = () => {
    if (selectedCartId) {
      removeFromCart(selectedCartId)
      onClose()
    }
  }

  const handleChangeQuantity = (cartId: number, value: number) => {
    setSelectedCartId(cartId)
    console.log(value)
  }

  return (
    <Container>
      <CartList
        isFetching={isFetching}
        carts={cartList.data}
        onRemoveItemFromCart={handleRemoveItemFromCart}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onChangeQuantity={handleChangeQuantity}
      />
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove item
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmRemoveItemFromCart} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  )
}

export default Cart
