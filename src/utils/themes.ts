/**
 * Converts a decimal value to a two-character hex string.
 *
 * @param value - The decimal value to convert.
 * @returns - A two-character hex string.
 */
const calculateShade = (value: number): string => {
  return Math.round(value).toString(16).padStart(2, '0')
}

/**
 * Generates a set of color shades from a given hex color.
 *
 * @param hexColor - The base color in hexadecimal format (e.g., `#RRGGBB`).
 * @returns - An object where keys represent the shade intensity (e.g., `50`, `100`, `200`, etc.) and values are the corresponding hex colors.
 */
export const generateShades = (hexColor: string): Record<string, string> => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const shades: Record<string, string> = {}

  // Define percentages
  const percentages = [0.9, 0.7, 0.6, 0.4, 0.2, 0, -0.1, -0.2, -0.3, -0.4]

  // Calculate new RGB values based on the percentage.
  percentages.forEach((percentage, index) => {
    const newR = r + (percentage >= 0 ? (255 - r) * percentage : r * percentage)
    const newG = g + (percentage >= 0 ? (255 - g) * percentage : g * percentage)
    const newB = b + (percentage >= 0 ? (255 - b) * percentage : b * percentage)

    shades[index ? index * 100 : 50] = `#${calculateShade(newR)}${calculateShade(newG)}${calculateShade(newB)}`
  })

  // Include the base color as the 500 shade.
  shades['500'] = `#${hex}`

  return shades
}
