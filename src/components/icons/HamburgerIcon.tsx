import { Icon, IconProps } from '@chakra-ui/react'

const HamburgerIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path d="M20.6304 0.55957H0.73584V2.55957H20.6304V0.55957Z" fill="currentColor" />
      <path d="M20.6304 7.55957H0.73584V9.55957H20.6304V7.55957Z" fill="currentColor" />
      <path d="M20.6304 14.5596H0.73584V16.5596H20.6304V14.5596Z" fill="currentColor" />
    </Icon>
  )
}

export default HamburgerIcon
