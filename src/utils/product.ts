/**
 * Calculate the price after discounted.
 *
 * @param price - The original price.
 * @param discount - The discount percentage.
 * @returns - The price after discounted and rounded to two decimal places.
 */
export const calculateProductPrice = (price: number, discount: number) =>
  parseFloat((price - (price * discount) / 100).toFixed(2))

export const calculateProductPriceInCart = (price: number, discount: number, quantityInCart: number) => {
  const originalProductPrice = calculateProductPrice(price, discount)

  return originalProductPrice * quantityInCart
}
