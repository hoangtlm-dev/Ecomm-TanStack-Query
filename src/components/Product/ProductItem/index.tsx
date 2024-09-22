import { memo } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  Fade,
  Flex,
  HStack,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  StackDivider,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import isEqual from 'react-fast-compare'

// Constants
import { ROUTES } from '@app/constants'

// Types
import { ListView, Product } from '@app/types'

// Components
import { CartButtonIcon, ProductRating } from '@app/components'

// Utils
import { calculateProductPrice, generateSlugByNameAndId } from '@app/utils'

interface IProductItemProps {
  product: Product
  listView: ListView
  isAddingToCart: (productId: number) => boolean
  onAddToCart: (product: Product) => void
}

const ProductItem = ({ product, listView, isAddingToCart, onAddToCart }: IProductItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { id, name, description, price, currencyUnit, discount, image, ratingStar, reviewNumber, isHotDeal } = product

  return listView === 'grid' ? (
    <LinkBox
      gap={4}
      borderWidth="3px"
      borderColor="backgroundBlurGray"
      borderRadius={4}
      onMouseOver={onOpen}
      onMouseLeave={onClose}
      _hover={{ borderColor: 'backgroundPrimary', transition: 'all .2s linear' }}
    >
      {/* Product Image */}
      <Box w="full" h="270px" bg="backgroundBlurGray" position="relative">
        <Center boxSize="full">
          <Image boxSize="full" objectFit="cover" src={image} alt={name} />
        </Center>

        {/* Add to cart */}
        <Fade in={isOpen}>
          <Box
            w="90%"
            h="90%"
            position="absolute"
            top={3.5}
            left={3.5}
            backgroundColor="backgroundWhite"
            opacity="0.9"
          ></Box>
          <IconButton
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={2}
            variant="outline"
            isRound
            aria-label="Cart icon"
            icon={<CartButtonIcon />}
            isLoading={isAddingToCart(id)}
            onClick={() => onAddToCart(product)}
          />
        </Fade>
      </Box>

      {/* Product Info */}
      <VStack p={4} gap={4} w="full">
        <Text fontSize="textMedium" w="full" fontWeight="bold" color="textDarkBlue" noOfLines={1} textAlign="center">
          <LinkOverlay as={ReactRouterLink} to={`${ROUTES.ROOT}${generateSlugByNameAndId({ name: name, id: id })}`}>
            {name}
          </LinkOverlay>
        </Text>
        <ProductRating ratingNumber={ratingStar} />
        <HStack>
          <Text fontSize="textMedium" fontWeight="bold" color="textBlue">
            {currencyUnit}
            {calculateProductPrice(price, discount)}
          </Text>
          {discount && (
            <>
              <Text fontSize="textTiny" color="textGray" textDecoration="line-through">
                {currencyUnit}
                {price}
              </Text>
              <Text fontSize="textTiny" fontWeight="bold" color="textLightRed">
                {discount}% Off
              </Text>
            </>
          )}
        </HStack>
      </VStack>

      {/* Hot Badge */}
      {isHotDeal && (
        <Box
          position="absolute"
          top={0}
          left={0}
          px={3}
          py={1}
          borderRadius={4}
          zIndex={2}
          backgroundColor="backgroundLightRed"
        >
          <Text fontSize="textMedium" color="textWhite" textTransform="uppercase">
            Hot
          </Text>
        </Box>
      )}
    </LinkBox>
  ) : (
    <LinkBox
      w="full"
      h="300px"
      gap={4}
      alignItems="flex-start"
      borderRadius={4}
      _hover={{ transform: 'translateY(-8px)', transition: 'all .2s linear' }}
    >
      <Flex gap={4} h="full">
        {/* Product Image */}
        <Box w="300px" h="full" bg="backgroundBlurGray">
          <Image boxSize="full" objectFit="cover" src={image} alt={name} />
        </Box>

        {/* Product Info */}
        <VStack
          flex={1}
          gap={4}
          alignItems="flex-start"
          divider={<StackDivider w="80%" borderColor="backgroundBlurGray" />}
        >
          <VStack gap={4}>
            <Text fontSize="textMedium" fontWeight="bold" color="textDarkBlue" noOfLines={1} alignSelf="flex-start">
              <LinkOverlay as={ReactRouterLink} to={`${ROUTES.ROOT}${generateSlugByNameAndId({ name: name, id: id })}`}>
                {name}
              </LinkOverlay>
            </Text>
            <HStack gap={4}>
              <ProductRating ratingNumber={ratingStar} />
              <Text fontSize="textTiny" color="textGray">
                {reviewNumber} reviews
              </Text>
              <Button variant="ghost" fontSize="textTiny" color="textBlue" h="unset" p={0}>
                Submit a review
              </Button>
            </HStack>
          </VStack>
          <VStack gap={4} w="full">
            <HStack alignSelf="flex-start">
              <Text fontSize="textMedium" fontWeight="bold" color="textBlue">
                {currencyUnit}
                {calculateProductPrice(price, discount)}
              </Text>
              {discount && (
                <>
                  <Text fontSize="textTiny" color="textGray" textDecoration="line-through">
                    {currencyUnit}
                    {price}
                  </Text>
                  <Text fontSize="textTiny" fontWeight="bold" color="textLightRed">
                    {discount}% Off
                  </Text>
                </>
              )}
            </HStack>
            <Text fontSize="textTiny" noOfLines={3}>
              {description}
            </Text>
            <Button
              data-testid="add-to-cart"
              alignSelf="flex-start"
              gap={3}
              bg="brand.50"
              _hover={{ opacity: 0.6 }}
              isLoading={isAddingToCart(id)}
              onClick={() => onAddToCart(product)}
            >
              <CartButtonIcon color="textBlue" />
              <Text color="textBlue">Add to Cart</Text>
            </Button>
          </VStack>
        </VStack>

        {/* Hot Badge */}
        {isHotDeal && (
          <Box position="absolute" top={0} left={0} px={3} py={1} borderRadius={4} backgroundColor="backgroundLightRed">
            <Text fontSize="textMedium" color="textWhite" textTransform="uppercase">
              Hot
            </Text>
          </Box>
        )}
      </Flex>
    </LinkBox>
  )
}

const MemoizedProductItem = memo(ProductItem, isEqual)

export default MemoizedProductItem
