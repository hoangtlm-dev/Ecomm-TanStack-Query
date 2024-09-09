import { memo } from 'react'
import { Button, Flex, Stack, Text } from '@chakra-ui/react'

interface IInvoiceProps {
  subTotal: number
  shippingFee?: number
  coupon?: string
  currencyUnit?: string
  onCheckOut: () => void
}

const Invoice = ({ subTotal, shippingFee = 0, coupon = 'No', currencyUnit = '$', onCheckOut }: IInvoiceProps) => {
  return (
    <Stack maxW="380px" flex={1}>
      <Flex justifyContent="space-between">
        <Text>Subtotal</Text>
        <Text>
          {currencyUnit}
          {subTotal}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Shipping fee</Text>
        <Text>{shippingFee}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Coupon</Text>
        <Text>{coupon}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt={4}>
        <Text fontSize="textExtraLarge">Total</Text>
        <Text fontSize="textExtraLarge">
          {currencyUnit}
          {subTotal + shippingFee}
        </Text>
      </Flex>
      <Button mt={4} onClick={onCheckOut}>
        Check out
      </Button>
    </Stack>
  )
}

const MemoizedInvoice = memo(Invoice)

export default MemoizedInvoice
