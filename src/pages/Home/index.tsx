import { useCallback, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Container, Flex, Stack, useToast } from '@chakra-ui/react'

// Constants
import { banner, MESSAGES, PAGINATION, ROUTES } from '@app/constants'

// Types
import { ListView, Product } from '@app/types'

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
import { useAddToCart, useGetCart, useGetCategories, useGetProducts, useQueryParams } from '@app/hooks'

// Stores
import { useListViewStore } from '@app/stores'

const Home = () => {
  const filteredColors = [
    'filterBlue.500',
    'filterRed.500',
    'filterBlack.500',
    'filterYellow.500',
    'filterPink.500',
    'filterBlurPink.500'
  ]
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const navigate = useNavigate()
  const toast = useToast()

  const queryParams = useQueryParams()

  const { isProductListLoading, productList, totalItems, itemsPerPage, currentPage } = useGetProducts()
  const { categories } = useGetCategories()
  const { isAddToCartLoading, addToCart } = useAddToCart()
  const { cart } = useGetCart()
  const { listView, setListView } = useListViewStore()

  const handleListViewChange = useCallback(
    (listView: ListView) => {
      setListView(listView)
    },
    [setListView]
  )

  const handleFilterByPrices = useCallback(
    async (priceRange: number[]) => {
      navigate({
        pathname: ROUTES.ROOT,
        search: createSearchParams({
          ...queryParams,
          min_price: priceRange[0].toString(),
          max_price: priceRange[1].toString()
        }).toString()
      })
    },
    [navigate, queryParams]
  )

  const handleSortByField = useCallback(
    async (fieldName: string) => {
      navigate({
        pathname: ROUTES.ROOT,
        search: createSearchParams({
          ...queryParams,
          sort: fieldName.toLowerCase()
        }).toString()
      })
    },
    [navigate, queryParams]
  )

  const handleShowListByItemsPerPage = useCallback(
    async (itemsPerPage: number) => {
      navigate({
        pathname: ROUTES.ROOT,
        search: createSearchParams({
          ...queryParams,
          limit: itemsPerPage.toString()
        }).toString()
      })
    },
    [navigate, queryParams]
  )

  const handleLoadingAddToCart = useCallback(
    (productId: number) => {
      if (selectedProduct?.id === productId && isAddToCartLoading) {
        return true
      }
      return false
    },
    [isAddToCartLoading, selectedProduct?.id]
  )

  const handleAddProductToCart = useCallback(
    (product: Product) => {
      setSelectedProduct(product)

      const { id, name, price, currencyUnit, quantity, discount, image } = product

      const cartItemFound = cart.find((cartItem) => cartItem.productId === id)

      const cartData = {
        // If the item  already exists in the cart, use its id to update the data. Otherwise, use 0 to create a new item in the cart
        id: cartItemFound ? cartItemFound.id : 0,
        productId: id,
        productName: name,
        productPrice: price,
        productCurrencyUnit: currencyUnit,
        productQuantity: quantity,
        productDiscount: discount,
        productImage: image,
        // If the item already exists in the cart, increase its quantity by 1. Otherwise, set the quantity to 1 for a new item.
        quantity: cartItemFound ? cartItemFound.quantity + 1 : 1
      }

      addToCart(cartData, {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: MESSAGES.ADD_TO_CART_SUCCESS,
            status: 'success'
          })
        },
        onError: () => {
          toast({
            title: 'Failed',
            description: MESSAGES.ADD_TO_CART_FAILED,
            status: 'error'
          })
        }
      })
    },
    [addToCart, cart, toast]
  )

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories categories={categories} />
          <FilterPrices
            minPrice={queryParams.min_price ? Number(queryParams.min_price) : 0}
            maxPrice={queryParams.max_price ? Number(queryParams.max_price) : 1000}
            onFilterByPrices={handleFilterByPrices}
          />
          <FilterColors colors={filteredColors} />
        </Stack>
        <Stack gap={8} flex={1}>
          <Banner
            background="backgroundPrimary"
            image={banner}
            heading="Adidas Men Running Sneakers"
            description="Performance and design. Taken right to the edge."
          />
          <ActionBar
            totalItems={totalItems}
            sortOptions={['Id', 'Name', 'Price']}
            showOptions={[6, 9, 12]}
            listView={listView}
            onlistViewChange={handleListViewChange}
            onSortByField={handleSortByField}
            onShowListByItemsPerPage={handleShowListByItemsPerPage}
          />
          <ProductList
            isLoading={isProductListLoading}
            products={productList}
            listView={listView}
            isAddingToCart={handleLoadingAddToCart}
            onAddToCart={handleAddProductToCart}
          />
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage || PAGINATION.DEFAULT_ITEMS_PER_PAGE}
            currentPage={currentPage}
          />
        </Stack>
      </Flex>
    </Container>
  )
}

export default Home
