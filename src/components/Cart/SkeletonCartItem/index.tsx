import { Flex, Skeleton, Stack } from '@chakra-ui/react'

const SkeletonCartItem = () => {
  return (
    <Flex gap={4} display={{ base: 'flex', lg: 'none' }}>
      <Skeleton boxSize="80px" />
      <Stack flex={1} justifyContent="center">
        <Flex justifyContent="space-between">
          <Skeleton w="80%" h={6} />
          <Skeleton boxSize={6} />
        </Flex>
        <Flex gap={4}>
          <Skeleton w="30%" maxW="80px" h={6} />
          <Skeleton w="30%" maxW="80px" h={6} />
          <Skeleton w="30%" maxW="80px" h={6} />
        </Flex>
      </Stack>
    </Flex>
  )
}

export default SkeletonCartItem
