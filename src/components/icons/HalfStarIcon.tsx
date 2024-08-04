import { Icon, IconProps } from '@chakra-ui/react'

const HalfStarIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M7.61882 0.163574V11.8505L2.75896 15.1245L4.45775 9.46448L0.491699 5.76453L5.67213 5.72449L7.61882 0.163574Z"
        fill="currentColor"
      />
      <path
        d="M7.61882 11.8505V0.163574L9.12197 5.79956L14.2877 6.0625L10.0362 9.58447L11.2869 15.3085L7.61882 11.8505Z"
        fill="#C1C8CE"
      />
    </Icon>
  )
}

export default HalfStarIcon
