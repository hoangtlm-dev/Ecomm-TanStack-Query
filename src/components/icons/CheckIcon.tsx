import { Icon, IconProps } from '@chakra-ui/react'

const CheckIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 48 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M3.42578 16.5537L17.2684 29.9912L44.9536 3.11621"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default CheckIcon
