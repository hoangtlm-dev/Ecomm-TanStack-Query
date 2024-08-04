import { Button, Center, VStack, Image, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

// Constants
import { logo, ROUTES } from '@app/constants'

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
      <Button variant="outline" as={ReactRouterLink} to={ROUTES.ROOT}>
        Shop now!
      </Button>
    </Center>
  )
}

export default ProductListEmpty
