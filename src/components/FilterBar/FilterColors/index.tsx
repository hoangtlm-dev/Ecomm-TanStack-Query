import { memo } from 'react'
import { Box, Heading, HStack, Link, Stack } from '@chakra-ui/react'
import { createSearchParams, Link as ReactRouterLink } from 'react-router-dom'
import isEqual from 'react-fast-compare'

// Constants
import { ROUTES } from '@app/constants'

// Hooks
import { useQueryParams } from '@app/hooks'

// Utils
import { removeFilterPrefixInColor, removeShadeInColor } from '@app/utils'
interface IFilterColorsProps {
  colors: string[]
  currentPath?: string
}

const FilterColors = ({ colors, currentPath = ROUTES.ROOT }: IFilterColorsProps) => {
  const queryParams = useQueryParams()

  return (
    <Stack p={4} bg="backgroundBlurGray" gap={4}>
      <Heading as="h3" fontSize="textMedium" fontWeight="medium" textTransform="uppercase">
        Colors
      </Heading>
      <HStack gap={4}>
        {colors.map((color) => {
          const isActive = queryParams?.color === removeFilterPrefixInColor(color)

          return (
            <Link
              key={color}
              as={ReactRouterLink}
              to={{
                pathname: currentPath,
                search: createSearchParams({
                  ...queryParams,
                  color: removeFilterPrefixInColor(color)
                }).toString()
              }}
              borderRadius="50%"
              boxSize={!isActive ? 6 : 'unset'}
              borderWidth={2}
              borderColor={isActive ? `${removeShadeInColor(color)}.200` : 'transparent'}
            >
              <Box
                display="block"
                bg={color}
                minW="unset"
                boxSize="100%"
                borderRadius="50%"
                p={2}
                border={isActive ? '3px solid white' : 'none'}
                _hover={{ opacity: 0.6 }}
              />
            </Link>
          )
        })}
      </HStack>
    </Stack>
  )
}

const MemoizedFilterColors = memo(FilterColors, isEqual)

export default MemoizedFilterColors
