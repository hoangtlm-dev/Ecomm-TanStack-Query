import { extendTheme } from '@chakra-ui/react'

// Base customize
import { breakpoints, colors, fonts, fontSizes, metrics } from './base'

// Component customize
import { ButtonCustom, ContainerCustom, LinkCustom, TextCustom } from './components'

export const theme = extendTheme({
  colors,
  components: {
    Button: ButtonCustom,
    Text: TextCustom,
    Link: LinkCustom,
    Container: ContainerCustom
  },
  sizes: {
    container: metrics.containerSize
  },
  breakpoints,
  fonts: fonts,
  fontSizes: fontSizes
})
