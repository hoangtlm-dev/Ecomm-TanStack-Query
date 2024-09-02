import { Button, HStack, NumberInput, NumberInputField } from '@chakra-ui/react'

export interface IQuantityControllerProps {
  minQuantity?: number
  maxQuantity: number
  currentQuantity: number
  onIncreaseQuantity: () => void
  onDecreaseQuantity: () => void
  onChangeQuantity: (value: number) => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '56px'
}

const QuantityController = ({
  minQuantity = 1,
  maxQuantity,
  currentQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onChangeQuantity,
  size = 'md'
}: IQuantityControllerProps) => {
  const buttonSize = sizeMap[size]

  return (
    <HStack gap={0}>
      <Button
        onClick={onDecreaseQuantity}
        variant="ghost"
        boxSize={buttonSize}
        minW={0}
        p={0}
        backgroundColor="backgroundBlurGray"
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
      >
        -
      </Button>
      <NumberInput
        value={currentQuantity}
        min={minQuantity}
        max={maxQuantity}
        onChange={(value) => onChangeQuantity(Number(value))}
        zIndex={1}
        textAlign="center"
        backgroundColor="backgroundBlurGray"
      >
        <NumberInputField
          boxSize={buttonSize}
          p={0}
          textAlign="center"
          border="none"
          borderRadius={0}
          backgroundColor="backgroundBlurGray"
        />
      </NumberInput>
      <Button
        onClick={onIncreaseQuantity}
        variant="ghost"
        boxSize={buttonSize}
        minW={0}
        p={0}
        backgroundColor="backgroundBlurGray"
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
      >
        +
      </Button>
    </HStack>
  )
}

export default QuantityController
