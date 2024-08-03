import { extendTheme } from '@chakra-ui/react'

// Base customize
import { breakpoints, colors, fonts, fontSizes, metrics } from './base'

export const theme = extendTheme({
  colors,
  components: {
    // TODO: custom components
  },
  sizes: {
    container: metrics.containerSize
  },
  breakpoints,
  fonts: fonts,
  fontSizes: fontSizes
})
