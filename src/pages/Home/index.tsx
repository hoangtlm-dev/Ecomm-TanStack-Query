import { useCallback, useState } from 'react'
import { Container, Flex, Grid, Stack } from '@chakra-ui/react'

// Constants
import { banner } from '@app/constants'

// Types
import { Category, Product } from '@app/types'

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
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@app/mocks'

const Home = () => {
  const [activeColor, setActiveColor] = useState('')
  const [listType, setListType] = useState<'grid' | 'list'>('grid')

  const handleListTypeChange = (type: 'grid' | 'list') => {
    setListType(type)
  }

  const handleFilterCategory = (category: Category) => {
    // Todo: Handle logic for filtering products by category
    console.log(category)
  }

  const handleFilterPrices = (priceRange: number[]) => {
    // Todo: Handle logic for filtering products by price range
    console.log(priceRange)
  }

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

  const handlePageChange = useCallback((newPage: number) => {
    // Todo: Handle logic for page change
    console.log(newPage)
  }, [])

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
            totalItems={13}
            sortOptions={['name', 'price']}
            showOptions={[12, 14, 16, 18, 20]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortItems={(value: string) => console.log(`Sorted by: ${value}`)}
            onShowItems={(value: number) => console.log(`Show items: ${value}`)}
          />
          <Grid
            templateColumns={
              listType === 'grid'
                ? { base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', xl: `repeat(3, 1fr)` }
                : 'repeat(1, 1fr)'
            }
            gap={4}
          >
            <ProductList
              isFetching={false}
              products={MOCK_PRODUCTS()}
              listType={listType}
              onAddToCart={handleAddProductToCart}
            />
          </Grid>
          <Pagination totalItems={12} itemsPerPage={6} currentPage={1} onPageChange={handlePageChange} />
        </Stack>
      </Flex>
    </Container>
  )
}

export default Home
