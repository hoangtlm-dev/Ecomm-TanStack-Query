import { Heading, Link, Stack, Text } from '@chakra-ui/react'
import { createSearchParams, NavLink } from 'react-router-dom'

// Constants
import { ROUTES } from '@app/constants'

// Types
import { Category } from '@app/types'

// Utils
import { generateSlugByNameAndId } from '@app/utils'

// Hooks
import { useQueryParams } from '@app/hooks'

interface IFilterCategoriesProps {
  categories: Category[]
  currentPath?: string
}

const FilterCategories = ({ categories, currentPath = ROUTES.ROOT }: IFilterCategoriesProps) => {
  const queryParams = useQueryParams()

  return (
    <Stack p={4} bg="backgroundBlurGray">
      <Heading as="h3" fontSize="textMedium" fontWeight="medium" textTransform="uppercase">
        Brands
      </Heading>
      <Stack>
        {categories.map((category) => {
          const { id, name, totalProducts } = category

          const isActive = queryParams.brand?.includes(name)

          return (
            <Link
              key={id}
              as={NavLink}
              to={{
                pathname: currentPath,
                search: createSearchParams({
                  ...queryParams,
                  brand: generateSlugByNameAndId({ name, id })
                }).toString()
              }}
              display="flex"
              justifyContent="space-between"
            >
              <Text color={isActive ? 'textBlue' : 'textDefault'}>{name}</Text>
              <Text color={isActive ? 'textBlue' : 'textDefault'} as="span">
                {totalProducts}
              </Text>
            </Link>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default FilterCategories
