import React from 'react'
import { Divider } from '@chakra-ui/react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { Product } from '@app/types'

// Components
import { SkeletonProductItem, ProductItem, ProductListEmpty } from '@app/components'

interface IProductListProps {
  isFetching: boolean
  products: Product[]
  listType: 'grid' | 'list'
  onAddToCart: (product: Product, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ProductList = ({ isFetching, products, listType, onAddToCart }: IProductListProps) => {
  const renderProducts = () => {
    if (isFetching) {
      return Array.from({ length: PAGINATION.DEFAULT_ITEMS_PER_PAGE }).map((_, index) => (
        <React.Fragment key={index}>
          <SkeletonProductItem listType={listType} />
          {listType === 'list' && index < PAGINATION.DEFAULT_ITEMS_PER_PAGE - 1 && <Divider orientation="horizontal" />}
        </React.Fragment>
      ))
    }

    if (!products.length) {
      return <ProductListEmpty />
    }

    return products.map((product, index) => (
      <React.Fragment key={product.id}>
        <ProductItem product={product} listType={listType} onAddToCart={onAddToCart} />
        {listType === 'list' && index < products.length - 1 && <Divider orientation="horizontal" />}
      </React.Fragment>
    ))
  }
  return <>{renderProducts()}</>
}

export default ProductList
