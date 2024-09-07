import { Center, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'

// Constants
import { MESSAGES, ROUTES } from '@app/constants'

// Components
import { MaintenanceIcon } from '@app/components'

const Fallback = () => {
  return (
    <Container>
      <VStack>
        <MaintenanceIcon boxSize={60} color="brand.500" />
        <Center>
          <VStack spacing={4}>
            <Heading textAlign="center">{MESSAGES.UNKNOWN_ERROR}</Heading>
            <Text textAlign="center">{MESSAGES.UNKNOWN_ERROR_DETAILS}</Text>
            <Text textAlign="center">
              Please refresh the page or{' '}
              <Link color="brand.500" href={ROUTES.ROOT}>
                back to home.
              </Link>
            </Text>
          </VStack>
        </Center>
      </VStack>
    </Container>
  )
}

export default Fallback
