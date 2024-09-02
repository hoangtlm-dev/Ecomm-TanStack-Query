import { ROUTES } from '@app/constants'
import { Container, Heading, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
      <Heading>404</Heading>
      <Link as={ReactRouterLink} to={ROUTES.ROOT}>
        Back to Home
      </Link>
    </Container>
  )
}

export default NotFound
