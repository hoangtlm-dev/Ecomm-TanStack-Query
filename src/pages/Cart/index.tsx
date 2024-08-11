import { useEffect } from 'react'
import { Container } from '@chakra-ui/react'

// Components
import { CartList } from '@app/components'

// Hooks
import { useCartContext } from '@app/hooks'

const Cart = () => {
  const { state: cartState, fetchCarts } = useCartContext()
  const { isFetching, cartList } = cartState

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

  const handleRemoveItemFromCart = (cartId: number) => {
    console.log(cartId)
  }

  return (
    <Container>
      <CartList isFetching={isFetching} carts={cartList.data} onRemoveItemFromCart={handleRemoveItemFromCart} />
    </Container>
  )
}

export default Cart
