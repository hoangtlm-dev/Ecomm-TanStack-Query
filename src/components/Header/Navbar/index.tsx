import { useRef } from 'react'
import {
  HStack,
  Link,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Container,
  DrawerHeader
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

// Constants
import { NAV_MENUS } from '@app/constants'

// Components
import { BrandingLogo, HamburgerIcon } from '@app/components'

interface INavMenuLinksProps {
  onClose?: () => void
}

const NavMenuLinks = ({ onClose }: INavMenuLinksProps) => {
  return (
    <>
      {NAV_MENUS.map(({ pageName, route }) => (
        <Link
          key={pageName}
          as={NavLink}
          to={route}
          fontSize="textLarge"
          fontWeight="medium"
          textTransform="uppercase"
          _activeLink={{ color: 'textBlue' }}
          onClick={onClose}
        >
          {pageName}
        </Link>
      ))}
    </>
  )
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <Container>
      <HStack justifyContent="space-between">
        <BrandingLogo />
        <HStack spacing={10} display={{ base: 'none', lg: 'flex' }}>
          <NavMenuLinks />
        </HStack>

        <IconButton
          ref={btnRef}
          variant="unstyled"
          aria-label="Open Menu"
          icon={<HamburgerIcon boxSize={5} color="black" />}
          display={{ base: 'flex', lg: 'none' }}
          justifyContent="flex-end"
          onClick={onOpen}
        />

        <Drawer isOpen={isOpen} placement="top" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton mt={3} />
            <DrawerHeader>
              <BrandingLogo />
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="flex-start">
                <NavMenuLinks />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </Container>
  )
}

export default Navbar
