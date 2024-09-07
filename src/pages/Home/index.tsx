import { useState } from 'react'
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
  useDisclosure,
  useToast
} from '@chakra-ui/react'

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
import {
  useAddToCart,
  useGetCart,
  useGetCategories,
  useGetProducts,
  useListTypeStore,
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
  const [priceRange, setPriceRange] = useState([0, 1000])

  const navigate = useNavigate()
  const { onClose: onCloseLoadingModal } = useDisclosure()
  const toast = useToast()

  const queryParams = useQueryParams()

  const { isProductListLoading, productList, totalItems, itemsPerPage, currentPage } = useGetProducts()
  const { categories } = useGetCategories()
  const { isAddToCartLoading, addToCart } = useAddToCart()
  const { cartList } = useGetCart()
  const { listType, setListType } = useListTypeStore()

  const handleListTypeChange = (listType: 'grid' | 'list') => {
    setListType(listType)
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

    const cartItemFound = cartList.find((cartItem) => cartItem.productId === id)

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

    await addToCart(cartData, {
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

    onCloseLoadingModal()
  }

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories categories={categories} />
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
            totalItems={totalItems}
            sortOptions={['Id', 'Name', 'Price']}
            showOptions={[6, 9, 12]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortByField={handleSortByField}
            onShowListByItemsPerPage={handleShowListByItemsPerPage}
          />
          <ProductList
            isLoading={isProductListLoading}
            products={productList}
            listType={listType}
            onAddToCart={handleAddProductToCart}
          />
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage || PAGINATION.DEFAULT_ITEMS_PER_PAGE}
            currentPage={currentPage}
          />
        </Stack>
      </Flex>

      {/* Modal for loading indicator */}
      <Modal
        isCentered
        isOpen={isAddToCartLoading}
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
