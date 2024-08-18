import React from 'react'
import { Center, Divider, Grid } from '@chakra-ui/react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { Product } from '@app/types'

// Components
import { SkeletonProductItem, ProductItem, ProductListEmpty } from '@app/components'

interface IProductListProps {
  isLoading: boolean
  products: Product[]
  listType: 'grid' | 'list'
  onAddToCart: (product: Product) => void
  gridTemplateColumns?: { [key: string]: string }
  skeletonTemplateColumns?: number
}

const ProductList = ({
  isLoading,
  products,
  listType,
  onAddToCart,
  gridTemplateColumns,
  skeletonTemplateColumns = PAGINATION.DEFAULT_ITEMS_PER_PAGE
}: IProductListProps) => {
  const defaultGridTemplateColumns =
    listType === 'grid'
      ? {
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)'
        }
      : 'repeat(1, 1fr)'

  const renderProducts = () => {
    if (isLoading) {
      return Array.from({ length: skeletonTemplateColumns }).map((_, index) => (
        <React.Fragment key={index}>
          <SkeletonProductItem listType={listType} />
          {listType === 'list' && index < skeletonTemplateColumns - 1 && <Divider orientation="horizontal" />}
        </React.Fragment>
      ))
    }

    if (!products.length) {
      return null
    }

    return products.map((product, index) => (
      <React.Fragment key={product.id}>
        <ProductItem product={product} listType={listType} onAddToCart={onAddToCart} />
        {listType === 'list' && index < products.length - 1 && <Divider orientation="horizontal" />}
      </React.Fragment>
    ))
  }

  return (
    <>
      {!isLoading && !products.length ? (
        <Center>
          <ProductListEmpty />
        </Center>
      ) : (
        <Grid w="full" templateColumns={gridTemplateColumns || defaultGridTemplateColumns} gap={4}>
          {renderProducts()}
        </Grid>
      )}
    </>
  )
}

export default ProductList
