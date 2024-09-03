import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import {
  Center,
  Container,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure
} from '@chakra-ui/react'

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
import {
  useAddToCart,
  useCartContext,
  useGetCategories,
  useGetProducts,
  useProductContext,
  useQueryParams
} from '@app/hooks'

const Home = () => {
  const filteredColors = [
    'filterBlue.500',
    'filterRed.500',
    'filterBlack.500',
    'filterYellow.500',
    'filterPink.500',
    'filterBlurPink.500'
  ]
  const { state: productState, setListType } = useProductContext()
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { state: cartState, fetchCart } = useCartContext()
  const { listType } = productState
  const { cartList } = cartState

  const navigate = useNavigate()
  const { onClose: onCloseLoadingModal } = useDisclosure()

  const queryParams = useQueryParams()

  const { isProductListPending, productList } = useGetProducts()
  const { isAddToCartPending, addToCart } = useAddToCart()
  const { categories } = useGetCategories()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handleListTypeChange = (type: 'grid' | 'list') => {
    setListType(type)
  }

  const handleFilterByPrices = async (priceRange: number[]) => {
    setPriceRange(priceRange)
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        min_price: priceRange[0].toString(),
        max_price: priceRange[1].toString()
      }).toString()
    })
  }

  const handleSortByField = async (fieldName: string) => {
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        sort: fieldName.toLowerCase()
      }).toString()
    })
  }

  const handleShowListByItemsPerPage = async (itemsPerPage: number) => {
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        limit: itemsPerPage.toString()
      }).toString()
    })
  }

  const handleAddProductToCart = async (product: Product) => {
    const { id, name, price, currencyUnit, quantity, discount, image } = product

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)

    await addToCart({
      id: cartItemFound ? cartItemFound.id : 0,
      productId: id,
      productName: name,
      productPrice: price,
      productCurrencyUnit: currencyUnit,
      productQuantity: quantity,
      productDiscount: discount,
      productImage: image,
      quantity: cartItemFound ? cartItemFound.quantity + 1 : 1
    })

    onCloseLoadingModal()
  }

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories categories={categories.data} />
          <FilterPrices
            minPrice={queryParams.min_price ? Number(queryParams.min_price) : priceRange[0]}
            maxPrice={queryParams.max_price ? Number(queryParams.max_price) : priceRange[1]}
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
            totalItems={productList.totalItems}
            sortOptions={['Id', 'Name', 'Price']}
            showOptions={[6, 9, 12]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortByField={handleSortByField}
            onShowListByItemsPerPage={handleShowListByItemsPerPage}
          />

          <ProductList
            isLoading={isProductListPending}
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

      {/* Modal for loading indicator */}
      <Modal
        isCentered
        isOpen={isAddToCartPending}
        onClose={onCloseLoadingModal}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="transparent" boxShadow="none">
          <Center>
            <Spinner size="lg" speed="0.8s" color="brand.600" />
          </Center>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Home
