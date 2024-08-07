import { useState } from 'react'
import { HStack, Link, IconButton, Container, Stack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

// Constants
import { NAV_MENUS } from '@app/constants'

// Components
import { BrandingLogo, HamburgerIcon } from '@app/components'
import { AnimatePresence, motion } from 'framer-motion'

const MotionStack = motion(Stack)

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <Container>
      <HStack justifyContent="space-between" p={4} position="relative" zIndex={2}>
        <BrandingLogo />
        <HStack as="nav" spacing={10} display={{ base: 'none', lg: 'flex' }}>
          <NavMenuLinks />
        </HStack>
        <IconButton
          aria-label="Open Menu"
          display={{ base: 'block', lg: 'none' }}
          variant="unstyled"
          textAlign="right"
          icon={<HamburgerIcon boxSize={5} color="black" />}
          onClick={toggleMobileMenu}
        />
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MotionStack
              p={4}
              as="nav"
              spacing={4}
              display={{ base: 'flex', lg: 'none' }}
              position="absolute"
              top={16}
              left={0}
              right={0}
              backgroundColor="backgroundWhite"
              zIndex={1}
              boxShadow="lg"
              initial={{ y: -64 }}
              animate={{ y: 0 }}
              exit={{ y: -64 }}
              transition={{ duration: 0.3 }}
            >
              <NavMenuLinks onClose={closeMobileMenu} />
            </MotionStack>
          )}
        </AnimatePresence>
      </HStack>
    </Container>
  )
}

export default Navbar
