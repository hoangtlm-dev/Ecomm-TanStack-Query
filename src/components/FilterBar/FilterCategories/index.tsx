import { Button, Heading, Stack, Text } from '@chakra-ui/react'

// Types
import { Category } from '@app/types'

interface IFilterCategoriesProps {
  categories: Category[]
  onFilterCategory: (categoryId: number) => void
  totalProduct: (categoryId: number) => number
  currentSearchParamValue?: string
}

const FilterCategories = ({
  categories,
  onFilterCategory,
  totalProduct,
  currentSearchParamValue
}: IFilterCategoriesProps) => {
  let activeCategory: Category = categories[0]

  if (currentSearchParamValue) {
    const foundCategory = categories.find(
      (category) => category.name.trim().toLowerCase() === currentSearchParamValue.trim().toLowerCase()
    )

    if (foundCategory) {
      activeCategory = foundCategory
    }
  }

  return (
    <Stack p={4} bg="backgroundBlurGray">
      <Heading as="h3" fontSize="textMedium" fontWeight="medium" textTransform="uppercase">
        Brands
      </Heading>
      <Stack>
        {categories.map((category) => {
          const { id, name } = category

          return (
            <Button
              key={id}
              variant="ghost"
              onClick={() => onFilterCategory(id)}
              justifyContent="space-between"
              px={0}
              h="unset"
              _hover={{
                opacity: 0.6
              }}
            >
              <Text color={activeCategory.id === id ? 'textBlue' : 'textGray'}>{name}</Text>
              <Text color={activeCategory.id === id ? 'textBlue' : 'textGray'}>{totalProduct(id)}</Text>
            </Button>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default FilterCategories
