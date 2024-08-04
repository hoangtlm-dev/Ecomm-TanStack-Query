import { memo, useCallback } from 'react'
import { Button, Center, HStack } from '@chakra-ui/react'

interface IPaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: IPaginationProps) => {
  // Calculate total pages based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      // Only call onPageChange if the new page is different from the current page and within valid range
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        onPageChange(newPage)
      }
    },
    [currentPage, totalPages, onPageChange]
  )

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
          <Button
            key={index}
            onClick={() => handlePageChange(pageNumber)}
            boxSize={12}
            variant={isActive ? 'solid' : 'ghost'}
            color={isActive ? 'white' : 'black'}
            borderRadius={0}
          >
            {pageNumber}
          </Button>
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
