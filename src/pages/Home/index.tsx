import { useEffect, useState } from 'react'
import { Container, Flex, Stack } from '@chakra-ui/react'

// Constants
import { banner, PAGINATION } from '@app/constants'

// Types
import { Product } from '@app/types'

// Components
import {
  ActionBar,
  Banner,
  FilterCategories,
  FilterColors,
  FilterPrices,
  Pagination,
  ProductList
} from '@app/components'

// Hooks
import { useCategoryContext, useProductContext, useQueryParams } from '@app/hooks'

// Utils
import { getIdFromSlug } from '@app/utils'

const Home = () => {
  const [activeColor, setActiveColor] = useState('')
  const [listType, setListType] = useState<'grid' | 'list'>('grid')
  const { state: productState, fetchProducts } = useProductContext()
  const { state: categoryState, fetchCategories } = useCategoryContext()
  const { data, isFetching } = productState
  const { data: categoryData } = categoryState
  const queryParams = useQueryParams()

  // Get current params from query params
  const currentCategoryId = queryParams.brand ? Number(getIdFromSlug(queryParams.brand)) : 1
  const currentPage = queryParams.page ? Number(queryParams.page) : 1

  useEffect(() => {
    fetchProducts({ categoryId: currentCategoryId, page: currentPage })
  }, [fetchProducts, currentCategoryId, currentPage])

  useEffect(() => {
    fetchCategories({})
  }, [fetchCategories])

  const handleListTypeChange = (type: 'grid' | 'list') => {
    setListType(type)
  }

  const handleFilterByPrices = (priceRange: number[]) => {
    // Todo: Handle logic for filtering products by price range
    console.log(priceRange)
  }

  const filteredColors = ['filterBlue', 'filterRed', 'filterBlack', 'filterYellow', 'filterPink', 'filterBlurPink']

  const handleFilterByColors = (color: string) => {
    // Todo: Handle logic for filtering products by color
    setActiveColor(color)
  }

  const handleSortByField = (fieldName: string) => {
    // Todo: Handle logic for sorting by field name
    console.log(`Sorted by: ${fieldName}`)
  }

  const handleShowListByItemsPerPage = (itemsPerPage: number) => {
    // Todo: Handle logic for showing list by items per pages
    console.log(`Show items: ${itemsPerPage}`)
  }

  const handleAddProductToCart = (product: Product) => {
    // Todo: Handle logic for adding product to cart
    console.log(product)
  }

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories categories={categoryData.data} />
          <FilterPrices minPrice={13.99} maxPrice={25.33} onFilterByPrices={handleFilterByPrices} />
          <FilterColors colors={filteredColors} activeColor={activeColor} onFilterByColors={handleFilterByColors} />
        </Stack>
        <Stack gap={8} flex={1}>
          <Banner
            background="backgroundPrimary"
            image={banner}
            heading="Adidas Men Running Sneakers"
            description="Performance and design. Taken right to the edge."
          />
          <ActionBar
            totalItems={data.totalItems}
            sortOptions={['name', 'price']}
            showOptions={[4, 6, 8, 10, 12, 14, 16, 18, 20]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortByField={handleSortByField}
            onShowListByItemsPerPage={handleShowListByItemsPerPage}
          />

          <ProductList
            isFetching={isFetching}
            products={data.data}
            listType={listType}
            onAddToCart={handleAddProductToCart}
          />
          <Pagination
            totalItems={data.totalItems}
            itemsPerPage={PAGINATION.DEFAULT_ITEMS_PER_PAGE}
            currentPage={currentPage}
          />
        </Stack>
      </Flex>
    </Container>
  )
}

export default Home
