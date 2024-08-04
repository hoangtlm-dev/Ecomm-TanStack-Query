import { HStack, Link, IconButton, Container, Menu, MenuButton, MenuList } from '@chakra-ui/react'
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
  return (
    <Container>
      <HStack justifyContent="space-between" pt={4}>
        <BrandingLogo />
        <HStack as="nav" spacing={10} display={{ base: 'none', lg: 'flex' }}>
          <NavMenuLinks />
        </HStack>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Open Menu"
            icon={<HamburgerIcon boxSize={5} color="black" />}
            variant="unstyled"
            textAlign="right"
            display={{ base: 'block', lg: 'none' }}
          />
          <MenuList as="nav" display={{ base: 'flex', lg: 'none' }} flexDirection="column" w="full">
            <NavMenuLinks />
          </MenuList>
        </Menu>
      </HStack>
    </Container>
  )
}

export default Navbar
