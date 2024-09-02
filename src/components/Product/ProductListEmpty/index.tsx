import { Center, VStack, Image, Text } from '@chakra-ui/react'

// Constants
import { logo } from '@app/constants'

const ProductListEmpty = () => {
  return (
    <Center flexDirection="column" gap={8}>
      <Image src={logo} boxSize={20} />
      <VStack>
        <Text fontSize="textLarge" fontWeight="semibold">
          Oops! There's no product found!
        </Text>
        <Text>Please search with other keyword or add another new product.</Text>
      </VStack>
    </Center>
  )
}

export default ProductListEmpty
