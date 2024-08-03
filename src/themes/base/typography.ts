const fontsInApp = {
  Poppins: '"Poppins", sans-serif',
  ProximaNova: '"ProximaNova", sans-serif'
}

export const fonts = {
  heading: fontsInApp.Poppins,
  body: fontsInApp.Poppins || fontsInApp.ProximaNova,
  mono: fontsInApp.Poppins
}

export const fontSizes = {
  textTiny: '14px',
  textSmall: '16px',
  textMedium: '18px',
  textLarge: '24px',
  textExtraLarge: '30px',
  headingSmall: '35px'
}
