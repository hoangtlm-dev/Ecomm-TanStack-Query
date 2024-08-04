import { Outlet } from 'react-router-dom'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center } from '@chakra-ui/react'

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
        <Center mb={8} py={4} bg="backgroundBlurGray">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink fontSize="textMedium">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink fontSize="textMedium">Docs</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink fontSize="textMedium">Breadcrumb</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Center>
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout
