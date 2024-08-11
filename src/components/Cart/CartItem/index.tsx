import { Box, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react'

// Types
import { Cart } from '@app/types'

// Components
import { CloseIcon, QuantityInput } from '@app/components'

interface ICartItemProps {
  cart: Cart
  onRemoveItemFromCart: (cartId: number) => void
}

const CartItem = ({ cart, onRemoveItemFromCart }: ICartItemProps) => {
  const { id, productName, productImage, productPrice } = cart

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
          <Text fontSize="textSmall">{productPrice}</Text>
          <QuantityInput />
          <Text fontSize="textSmall">$499.99</Text>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default CartItem
