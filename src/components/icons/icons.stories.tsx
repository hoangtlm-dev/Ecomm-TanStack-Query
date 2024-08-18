import { cloneElement, ReactElement } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { IconProps } from '@chakra-ui/react'

// Components
import {
  HamburgerIcon,
  UserIcon,
  CartHeaderIcon,
  GridIcon,
  ArrowDownIcon,
  CartButtonIcon,
  StarIcon,
  HalfStarIcon,
  FacebookIcon,
  TwitterIcon,
  CloseIcon,
  CheckIcon
} from '@app/components'

type StoryWrapperProps = IconProps & {
  children: ReactElement
}
const StoryWrapper = ({ children }: StoryWrapperProps) => {
  return children
}

const meta: Meta<typeof StoryWrapper> = {
  title: 'Components/Icons',
  argTypes: {
    children: { table: { disable: true } },
    boxSize: {
      control: 'select',
      options: [4, 8, 12, 16, 20, 24, 28, 32, 36]
    },
    color: { control: 'color' }
  },
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true
    }
  }
}

export default meta

type Story = StoryObj<typeof StoryWrapper>

const template: Story = {
  render: ({ children, ...rest }) => {
    return cloneElement(children, rest)
  }
}

export const Hamburger: Story = {
  ...template,
  args: {
    children: <HamburgerIcon />,
    boxSize: 12,
    color: '#171717'
  }
}

export const User: Story = {
  ...template,
  args: {
    children: <UserIcon />,
    boxSize: 20,
    color: '#22262A'
  }
}

export const CartHeader: Story = {
  ...template,
  args: {
    children: <CartHeaderIcon />,
    boxSize: 20,
    color: '#22262A'
  }
}

export const ArrowDown: Story = {
  ...template,
  args: {
    children: <ArrowDownIcon />,
    boxSize: 12,
    color: '#22262A'
  }
}

export const Grid: Story = {
  ...template,
  args: {
    children: <GridIcon />,
    boxSize: 12,
    color: '#22262A'
  }
}

export const CartButton: Story = {
  ...template,
  args: {
    children: <CartButtonIcon />,
    boxSize: 20,
    color: '#33A0FF'
  }
}

export const Star: Story = {
  ...template,
  args: {
    children: <StarIcon />,
    boxSize: 12,
    color: '#FFC600'
  }
}

export const HalfStar: Story = {
  ...template,
  args: {
    children: <HalfStarIcon />,
    boxSize: 12,
    color: '#FFC600'
  }
}

export const Facebook: Story = {
  ...template,
  args: {
    children: <FacebookIcon />,
    boxSize: 12,
    color: '#9098b1'
  }
}

export const Twitter: Story = {
  ...template,
  args: {
    children: <TwitterIcon />,
    boxSize: 12,
    color: '#9098b1'
  }
}

export const Close: Story = {
  ...template,
  args: {
    children: <CloseIcon />,
    boxSize: 12,
    color: '#9098b1'
  }
}

export const Check: Story = {
  ...template,
  args: {
    children: <CheckIcon />,
    boxSize: 12,
    color: '#9098b1'
  }
}
