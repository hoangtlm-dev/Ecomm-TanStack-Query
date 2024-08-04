import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Components
import { ActionHeader, Navbar } from '@app/components'

const MainLayout = () => {
  return (
    <>
      <Box as="header">
        <ActionHeader />
        <Navbar />
      </Box>
      <Box as="main" py={8}>
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout
