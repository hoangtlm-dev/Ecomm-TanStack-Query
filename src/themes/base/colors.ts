import { generateShades } from '@app/utils'

const brandColors = {
  primary: '#40bfff'
}

const systemColors = {
  white: '#ffffff',
  black: '#22262a',
  blue: '#33a0ff',
  darkBlue: '#223263',
  semiDarkBlue: '#385c8e',
  blurBlue: '#ebf6ff',
  lightBlue: '#2e90e5',
  lightRed: '#ff4858',
  blurRed: '#fb7181',
  gray: '#9098b1',
  blurGray: '#f6f7f8',
  iconGray: '#c1c8ce',
  yellow: '#ffc600'
}

const filterColors = {
  blue: '#006cff',
  red: '#fc3e39',
  black: '#171717',
  yellow: '#fff600',
  pink: '#ff00b4',
  blurPink: '#efdfdf'
}

const socialColors = {
  facebook: '#385c8e',
  twitter: '#03a9f4'
}

export const colors = {
  brand: {
    primary: brandColors.primary,
    ...generateShades(brandColors.primary)
  },
  semiDarkBlue: generateShades(systemColors.semiDarkBlue),
  blurBlue: generateShades(systemColors.blurBlue),
  lightBlue: systemColors.lightBlue,

  // Icons
  iconGray: systemColors.iconGray,
  iconActive: brandColors.primary,

  // Rating
  ratingYellow: systemColors.yellow,

  // Social
  facebook: socialColors.facebook,
  twitter: socialColors.twitter,

  // Filters
  filterBlue: filterColors.blue,
  filterRed: filterColors.red,
  filterBlack: filterColors.black,
  filterYellow: filterColors.yellow,
  filterPink: filterColors.pink,
  filterBlurPink: filterColors.blurPink,

  // Texts
  textDefault: systemColors.black,
  textWhite: systemColors.white,
  textBlue: systemColors.blue,
  textDarkBlue: systemColors.darkBlue,
  textGray: systemColors.gray,
  textLightRed: systemColors.lightRed,

  // Backgrounds
  backgroundPrimary: brandColors.primary,
  backgroundBlurRed: systemColors.blurRed,
  backgroundLightRed: systemColors.lightRed,
  backgroundBlurGray: systemColors.blurGray,
  backgroundWhite: systemColors.white,
  backgroundLightBlue: systemColors.lightBlue,

  // Borders
  borderPrimary: brandColors.primary,
  borderBlurGray: systemColors.blurGray
}
