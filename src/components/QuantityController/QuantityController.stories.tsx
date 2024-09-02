import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Center } from '@chakra-ui/react'

// Components
import { IQuantityControllerProps, QuantityController } from '@app/components'

const meta: Meta<typeof QuantityController> = {
  title: 'Components/QuantityController',
  component: QuantityController,
  argTypes: {
    minQuantity: { control: { type: 'number' }, defaultValue: 1 },
    maxQuantity: { control: { type: 'number' }, defaultValue: 10 },
    currentQuantity: { control: { type: 'number' }, defaultValue: 1 },
    size: { control: 'radio' }
  }
}

export default meta

type Story = StoryObj<typeof QuantityController>

export const Default: Story = (args: IQuantityControllerProps) => {
  const [quantity, setQuantity] = useState(args.currentQuantity)

  const handleIncreaseQuantity = () => {
    if (quantity < args.maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > (args.minQuantity ?? 1)) {
      setQuantity(quantity - 1)
    }
  }

  const handleChangeQuantity = (value: number) => {
    setQuantity(value)
  }

  return (
    <Center>
      <QuantityController
        {...args}
        currentQuantity={quantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onChangeQuantity={handleChangeQuantity}
      />
    </Center>
  )
}

Default.args = {
  minQuantity: 1,
  maxQuantity: 10,
  currentQuantity: 1
}
