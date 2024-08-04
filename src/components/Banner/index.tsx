import { Box, Flex, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'

interface IBannerProps {
  background: string
  image: string
  heading: string
  description: string
}

const Banner = ({ background, image, heading, description }: IBannerProps) => {
  return (
    <Flex
      flexDirection={{ base: 'column-reverse', lg: 'row' }}
      background={background}
      alignItems="center"
      justifyContent="center"
      w="full"
      px={{ base: 4, lg: 'unset' }}
      pb={{ base: 10, lg: 'unset' }}
    >
      <VStack alignItems="flex-start" flexBasis="30%" gap={4}>
        <Heading
          as="h3"
          fontSize="textExtraLarge"
          color="white"
          fontWeight="medium"
          noOfLines={2}
          maxW={{ base: 'full', lg: '80%' }}
        >
          {heading}
        </Heading>
        <Text variant="white" fontSize="textTiny">
          {description}
        </Text>
        <Link>
          <Text variant="white" fontSize="textSmall" textTransform="uppercase" noOfLines={2}>
            Shop now
          </Text>
          <Box w="50%" h={1} backgroundColor="white"></Box>
        </Link>
      </VStack>
      <Box transform={{ base: 'translate(0, -30px)', lg: 'translate(-30px, -30px)' }}>
        <Image src={image} alt="E-Comm banner image" />
      </Box>
    </Flex>
  )
}

export default Banner
