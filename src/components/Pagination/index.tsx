import { memo } from 'react'
import { Center, HStack, Link } from '@chakra-ui/react'
import { createSearchParams, Link as ReactRouterLink } from 'react-router-dom'

// Constants
import { ROUTES } from '@app/constants'

// Hooks
import { useQueryParams } from '@app/hooks'

interface IPaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  currentPath?: string
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, currentPath = ROUTES.ROOT }: IPaginationProps) => {
  const queryParams = useQueryParams()

  // Calculate total pages based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Render pagination buttons
  const renderPagination = () => {
    // Create an array of pages based on the total pages
    const pages = Array(totalPages)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Check if the current page is active
        const isActive = pageNumber === currentPage

        // Render the page button
        return (
          <Link
            as={ReactRouterLink}
            to={{
              pathname: currentPath,
              search: createSearchParams({
                ...queryParams,
                page: pageNumber.toString()
              }).toString()
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            key={index}
            boxSize={12}
            color={isActive ? 'white' : 'black'}
            borderRadius={0}
            backgroundColor={isActive ? 'backgroundPrimary' : 'transparent'}
          >
            {pageNumber}
          </Link>
        )
      })

    return pages
  }

  // Render the Pagination component
  return (
    <Center bg="backgroundBlurGray">
      <HStack spacing={0}>{renderPagination()}</HStack>
    </Center>
  )
}

const MemoizedPagination = memo(Pagination)

export default MemoizedPagination
