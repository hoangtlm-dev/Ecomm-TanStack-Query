import { memo } from 'react'
import { Box, Center, Divider, Grid } from '@chakra-ui/react'
import isEqual from 'react-fast-compare'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { ListView, Product } from '@app/types'

// Components
import { SkeletonProductItem, ProductItem, ProductListEmpty } from '@app/components'

interface IProductListProps {
  isLoading: boolean
  products: Product[]
  listView?: ListView
  gridTemplateColumns?: { [key: string]: string }
  skeletonTemplateColumns?: number
  isAddingToCart: (productId: number) => boolean
  onAddToCart: (product: Product) => void
}

const ProductList = ({
  isLoading,
  products,
  listView = 'grid',
  gridTemplateColumns,
  skeletonTemplateColumns = PAGINATION.DEFAULT_ITEMS_PER_PAGE,
  isAddingToCart,
  onAddToCart
}: IProductListProps) => {
  const defaultGridTemplateColumns =
    listView === 'grid'
      ? {
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)'
        }
      : 'repeat(1, 1fr)'

  if (isLoading) {
    return (
      <Grid
        as="ul"
        w="full"
        listStyleType="none"
        templateColumns={gridTemplateColumns || defaultGridTemplateColumns}
        gap={4}
      >
        {Array.from({ length: skeletonTemplateColumns }).map((_, index) => (
          <Box as="li" key={index}>
            <SkeletonProductItem listView={listView} />
            {listView === 'list' && index < skeletonTemplateColumns - 1 && <Divider orientation="horizontal" />}
          </Box>
        ))}
      </Grid>
    )
  }

  if (!isLoading && !products.length) {
    return (
      <Center>
        <ProductListEmpty />
      </Center>
    )
  }

  return (
    <Grid
      as="ul"
      w="full"
      listStyleType="none"
      templateColumns={gridTemplateColumns || defaultGridTemplateColumns}
      gap={4}
    >
      {products.map((product, index) => (
        <Box as="li" key={product.id}>
          <ProductItem
            product={product}
            listView={listView}
            isAddingToCart={isAddingToCart}
            onAddToCart={onAddToCart}
          />
          {listView === 'list' && index < products.length - 1 && <Divider orientation="horizontal" />}
        </Box>
      ))}
    </Grid>
  )
}

const MemoizedProductList = memo(ProductList, isEqual)

export default MemoizedProductList
