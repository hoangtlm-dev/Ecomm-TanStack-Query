import { Button, HStack, NumberInput, NumberInputField } from '@chakra-ui/react'

interface IQuantityControllerProps {
  minQuantity?: number
  maxQuantity: number
  currentQuantity: number
  onIncreaseQuantity: () => void
  onDecreaseQuantity: () => void
  onChangeQuantity: (value: number) => void
}

const QuantityController = ({
  minQuantity = 1,
  maxQuantity,
  currentQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onChangeQuantity
}: IQuantityControllerProps) => {
  return (
    <HStack maxW={{ base: 'full', sm: '320px' }} spacing={0} bg="backgroundBlurGray" borderRadius="8px">
      <HStack>
        <Button onClick={onDecreaseQuantity}>-</Button>
        <NumberInput
          defaultValue={currentQuantity}
          value={currentQuantity}
          min={minQuantity}
          max={maxQuantity}
          onChange={(value) => onChangeQuantity(Number(value))}
        >
          <NumberInputField />
        </NumberInput>
        <Button onClick={onIncreaseQuantity}>+</Button>
      </HStack>
    </HStack>
  )
}

export default QuantityController
