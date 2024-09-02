// Constants
import { MESSAGES } from '@app/constants'

/**
 * Removes the characters after the period (.) in a color string.
 *
 * @param color - The color string, possibly containing a shade after a period.
 * @returns - The color string without the shade.
 *
 * @example
 * removeShade('filterRed.500'); // returns 'filterRed'
 * removeShade('filterBlue'); // returns 'filterBlue'
 */
export const removeShadeInColor = (color: string): string => color.replace(/\.\d+$/, '')

/**
 * Removes the "filter" prefix from a given color string and converts the remaining
 * string from camelCase to snake_case.
 *
 * @param color - The input color string, expected to start with the "filter" prefix.
 * @returns - The color string without the "filter" prefix, converted to snake_case.
 * @throws - Throws an error if the input string does not start with "filter".
 *
 * @example
 * removeFilterPrefixInColor("filterRed.500"); // returns "red"
 * removeFilterPrefixInColor("filterBlurPink.500"); returns "blur_pink"
 */
export const removeFilterPrefixInColor = (color: string): string => {
  const colorWithoutShade = removeShadeInColor(color)

  if (colorWithoutShade.startsWith('filter')) {
    // Remove the "filter" prefix (the first 6 characters)
    let colorWithoutPrefix = color.slice(6)

    // Remove the shade (e.g., ".500") if present
    colorWithoutPrefix = colorWithoutPrefix.replace(/\.\d+$/, '')

    // Convert camelCase to snake_case
    const snakeCase = colorWithoutPrefix.replace(/([A-Z])/g, '_$1').toLowerCase()

    // Return the converted string, ensuring no leading underscore
    return snakeCase.startsWith('_') ? snakeCase.slice(1) : snakeCase
  } else {
    throw new Error(MESSAGES.COLOR_NOT_INCLUDE_FILTER(colorWithoutShade))
  }
}

/**
 *
 * @param color - The input color string, expected to be in snake_case format.
 * @returns - The color string converted to camelCase.
 */
export const convertColorParamsToCamelCase = (color: string): string =>
  color.toLowerCase().replace(/_([a-z])/g, (letter) => letter.toUpperCase())
