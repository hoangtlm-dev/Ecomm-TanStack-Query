import { Button, HStack, Input, InputProps, forwardRef, useNumberInput } from '@chakra-ui/react'

const QuantityInput = forwardRef<InputProps, 'input'>((props, ref) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 0,
    max: 10
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack maxW={{ base: 'full', sm: '320px' }} spacing={0} bg="backgroundBlurGray" borderRadius="8px">
      <Button variant="ghost" {...dec} size="lg" fontWeight="bold">
        -
      </Button>
      <Input
        p={0}
        w={{ base: 'full', sm: 14 }}
        h={14}
        border="none"
        textAlign="center"
        {...input}
        {...props}
        ref={ref}
      />
      <Button variant="ghost" {...inc} size="lg" fontWeight="bold">
        +
      </Button>
    </HStack>
  )
})

export default QuantityInput
