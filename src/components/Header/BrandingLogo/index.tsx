import { Heading, HStack, Image, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

// Constants
import { logo, ROUTES } from '@app/constants'

const BrandingLogo = () => {
  return (
    <Link as={ReactRouterLink} to={ROUTES.ROOT}>
      <HStack>
        <Image src={logo} boxSize="44px" />
        <Heading fontSize="textMedium" fontWeight="bold">
          E-Comm
        </Heading>
      </HStack>
    </Link>
  )
}

export default BrandingLogo
