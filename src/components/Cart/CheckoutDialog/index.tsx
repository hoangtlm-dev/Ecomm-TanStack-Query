import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react'

// Components
import { CheckIcon } from '@app/components'

interface ICheckoutDialogProps {
  onCheckOut: () => void
}

const CheckoutDialog = ({ onCheckOut }: ICheckoutDialogProps) => {
  return (
    <VStack gap={20} backgroundColor="backgroundWhite">
      <Heading fontSize="textLarge" color="textBlue" fontWeight="semibold">
        Make Payment
      </Heading>
      <VStack>
        <Center boxSize={24} borderRadius="40%" backgroundColor="backgroundPrimary">
          <CheckIcon boxSize={10} color="white" />
        </Center>
        <Text fontSize="textLarge" fontWeight="bold">
          Success
        </Text>
      </VStack>
      <Button size="lg" minW="240px" fontSize="textLarge" fontWeight="bold" py={8} onClick={onCheckOut}>
        Completed
      </Button>
    </VStack>
  )
}

export default CheckoutDialog
