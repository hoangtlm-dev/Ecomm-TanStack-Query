import { Icon, IconProps } from '@chakra-ui/react'

const CartHeaderIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M9.1875 21C9.49816 21 9.75 20.7482 9.75 20.4375C9.75 20.1268 9.49816 19.875 9.1875 19.875C8.87684 19.875 8.625 20.1268 8.625 20.4375C8.625 20.7482 8.87684 21 9.1875 21Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0625 21C17.3732 21 17.625 20.7482 17.625 20.4375C17.625 20.1268 17.3732 19.875 17.0625 19.875C16.7518 19.875 16.5 20.1268 16.5 20.4375C16.5 20.7482 16.7518 21 17.0625 21Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3H5.25L7.5 16.5H18.75L21 6.375H6.375"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default CartHeaderIcon
