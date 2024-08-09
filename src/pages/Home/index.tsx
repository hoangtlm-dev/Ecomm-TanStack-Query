import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Container, Flex, Stack, useToast } from '@chakra-ui/react'

// Constants
import { banner, MESSAGES, PAGINATION, ROUTES } from '@app/constants'

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
import { useCartContext, useCategoryContext, useProductContext, useQueryParams } from '@app/hooks'

// Utils
import { getIdFromSlug } from '@app/utils'

const Home = () => {
  const [activeColor, setActiveColor] = useState('')
  const [listType, setListType] = useState<'grid' | 'list'>('grid')
  const navigate = useNavigate()

  const { state: productState, fetchProducts } = useProductContext()
  const { state: categoryState, fetchCategories } = useCategoryContext()
  const { state: cartState, fetchCarts, addToCart } = useCartContext()
  const { productList, isProductListFetching } = productState
  const { categoryList } = categoryState
  const { cartList } = cartState
  const queryParams = useQueryParams()

  const toast = useToast()

  // Get current params from query params
  const currentCategoryId = queryParams.brand ? Number(getIdFromSlug(queryParams.brand)) : 1
  const currentPage = queryParams.page ? Number(queryParams.page) : 1

  useEffect(() => {
    fetchProducts({ categoryId: currentCategoryId, page: currentPage })
  }, [fetchProducts, currentCategoryId, currentPage])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

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
    const { id, name, price, unitPrice, quantity, discount, image } = product

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)

    addToCart({
      id: cartItemFound ? cartItemFound.id : 0,
      productId: id,
      productName: name,
      productPrice: price,
      productUnitPrice: unitPrice,
      productQuantity: quantity,
      productDiscount: discount,
      productImage: image,
      quantity: cartItemFound ? cartItemFound.quantity + 1 : 1
    })

    toast({
      position: 'bottom-right',
      title: 'Success',
      description: MESSAGES.ADD_PRODUCT_SUCCESS,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories categories={categoryList.data} />
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
            totalItems={productList.totalItems}
            sortOptions={['Id', 'Name', 'Price']}
            showOptions={[6, 9, 12]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortByField={handleSortByField}
            onShowListByItemsPerPage={handleShowListByItemsPerPage}
          />

          <ProductList
            isFetching={isProductListFetching}
            products={productList.data}
            listType={listType}
            onAddToCart={handleAddProductToCart}
          />
          <Pagination
            totalItems={productList.totalItems}
            itemsPerPage={productList.limit || PAGINATION.DEFAULT_ITEMS_PER_PAGE}
            currentPage={productList.page}
          />
        </Stack>
      </Flex>
    </Container>
  )
}

export default Home
