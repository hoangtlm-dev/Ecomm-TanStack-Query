import { Icon, IconProps } from '@chakra-ui/react'

const CloseIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M9.24889 1.02937L8.48975 0.322266L0.13913 8.10044L0.898277 8.80755L9.24889 1.02937Z"
        fill="currentColor"
      />
      <path
        d="M8.48988 8.80769L9.24902 8.10059L0.898408 0.322411L0.139261 1.02952L8.48988 8.80769Z"
        fill="currentColor"
      />
    </Icon>
  )
}

export default CloseIcon
