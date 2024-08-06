import { useCallback, useEffect, useState } from 'react'
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

// Mocks
import { MOCK_CATEGORIES } from '@app/mocks'

// Hooks
import { useProductContext } from '@app/hooks'

const Home = () => {
  const [activeColor, setActiveColor] = useState('')
  const [listType, setListType] = useState<'grid' | 'list'>('grid')
  const { state: productState, fetchProducts } = useProductContext()
  const { data, isFetching } = productState

  useEffect(() => {
    fetchProducts({})
  }, [fetchProducts])

  const handleListTypeChange = (type: 'grid' | 'list') => {
    setListType(type)
  }

  const handleFilterCategory = useCallback(
    (categoryId: number) => {
      fetchProducts({ categoryId: categoryId })
    },
    [fetchProducts]
  )

  const handleFilterPrices = (priceRange: number[]) => {
    // Todo: Handle logic for filtering products by price range
    console.log(priceRange)
  }

  const handleSortByField = useCallback(
    (fieldName: string) => {
      fetchProducts({ _sort: fieldName })
    },
    [fetchProducts]
  )

  const filteredColors = ['filterBlue', 'filterRed', 'filterBlack', 'filterYellow', 'filterPink', 'filterBlurPink']

  const handleFilterColors = (color: string) => {
    // Todo: Handle logic for filtering products by color
    setActiveColor(color)
  }

  const handleAddProductToCart = (product: Product, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event && event.preventDefault()
    // Todo: Handle logic for adding product to cart
    console.log(product)
  }

  const handlePageChange = useCallback(
    (newPage: number) => {
      fetchProducts({ _page: newPage })
    },
    [fetchProducts]
  )

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories
            categories={MOCK_CATEGORIES}
            onFilterCategory={handleFilterCategory}
            totalProduct={(categoryId: number) => categoryId}
          />
          <FilterPrices minPrice={13.99} maxPrice={25.33} onFilterPrices={handleFilterPrices} />
          <FilterColors colors={filteredColors} activeColor={activeColor} onFilterColors={handleFilterColors} />
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
            showOptions={[12, 14, 16, 18, 20]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortItems={handleSortByField}
            onShowItems={(value: number) => console.log(`Show items: ${value}`)}
          />

          <ProductList
            isFetching={isFetching}
            products={data.data}
            listType={listType}
            onAddToCart={handleAddProductToCart}
          />
          {!isFetching && (
            <Pagination
              totalItems={data.totalItems}
              itemsPerPage={PAGINATION.DEFAULT_ITEMS_PER_PAGE || data.limit}
              currentPage={data.page}
              onPageChange={handlePageChange}
            />
          )}
        </Stack>
      </Flex>
    </Container>
  )
}

export default Home
