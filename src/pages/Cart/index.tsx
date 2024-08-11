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
  Flex,
  useDisclosure
} from '@chakra-ui/react'

// Components
import { CartList, Invoice } from '@app/components'

// Hooks
import { useCartContext } from '@app/hooks'
import { calculateProductPrice } from '@app/utils'

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

  const subTotal = cartList.data.reduce((acc, cartItem) => {
    const { productPrice, productDiscount, quantity } = cartItem

    const totalPriceItemInCart = calculateProductPrice(productPrice, productDiscount, quantity)
    return parseFloat((acc + totalPriceItemInCart).toFixed(2))
  }, 0)

  const handleCheckOut = () => {
    // Todo: Handle checkout cart
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
      <Flex justifyContent="flex-end" mt={12}>
        <Invoice subTotal={subTotal} onCheckOut={handleCheckOut} />
      </Flex>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
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
