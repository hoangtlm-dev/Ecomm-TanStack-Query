import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Container, Flex, Stack } from '@chakra-ui/react'

// Constants
import { banner, PAGINATION, ROUTES } from '@app/constants'

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
  const navigate = useNavigate()

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
    fetchProducts({ categoryId: currentCategoryId, page: currentPage, _sort: fieldName.toLowerCase() })
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        sort: fieldName.toLowerCase()
      }).toString()
    })
  }

  const handleShowListByItemsPerPage = (itemsPerPage: number) => {
    fetchProducts({ categoryId: currentCategoryId, page: currentPage, limit: itemsPerPage })
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        limit: itemsPerPage.toString()
      }).toString()
    })
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
            sortOptions={['Id', 'Name', 'Price']}
            showOptions={[6, 9, 12]}
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
            itemsPerPage={data.limit || PAGINATION.DEFAULT_ITEMS_PER_PAGE}
            currentPage={currentPage}
          />
        </Stack>
      </Flex>
    </Container>
  )
}

export default Home
