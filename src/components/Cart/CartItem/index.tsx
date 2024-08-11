import { Box, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react'

// Types
import { Cart } from '@app/types'

// Components
import { CloseIcon, QuantityInput } from '@app/components'

// Utils
import { calculateProductPrice, calculateProductPriceInCart } from '@app/utils'

interface ICartItemProps {
  cart: Cart
  onRemoveItemFromCart: (cartId: number) => void
}

const CartItem = ({ cart, onRemoveItemFromCart }: ICartItemProps) => {
  const { id, productName, productImage, productPrice, productUnitPrice, productDiscount, quantity } = cart

  return (
    <Flex gap={4} display={{ base: 'flex', lg: 'none' }}>
      <Box boxSize="80px">
        <Image src={productImage} boxSize="full" objectFit="cover" />
      </Box>
      <Stack flex={1} justifyContent="center">
        <Flex justifyContent="space-between" gap={4}>
          <Heading as="h3" fontSize="textSmall" noOfLines={1}>
            {productName}
          </Heading>
          <IconButton
            boxSize={4}
            minW="unset"
            aria-label="close"
            backgroundColor="backgroundBlurGray"
            icon={<CloseIcon boxSize={2} color="textLightRed" />}
            _hover={{ opacity: 0.6 }}
            onClick={() => onRemoveItemFromCart(id)}
          />
        </Flex>
        <Flex gap={4}>
          <Text fontSize="textSmall">
            {productUnitPrice}
            {calculateProductPrice(productPrice, productDiscount)}
          </Text>
          <QuantityInput />
          <Text fontSize="textSmall">
            {productUnitPrice}
            {calculateProductPriceInCart(productPrice, productDiscount, quantity)}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default CartItem
