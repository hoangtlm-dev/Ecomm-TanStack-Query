import { ROUTES } from '@app/constants'
import { Container, Heading, Link, VStack } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
      <VStack>
        <Heading fontSize="40px">404</Heading>
        <Link as={ReactRouterLink} to={ROUTES.ROOT} color="brand.500">
          Back to Home
        </Link>
      </VStack>
    </Container>
  )
}

export default NotFound
