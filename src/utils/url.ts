/**
 * Removes special characters from a string.
 * @param str - The input string from which special characters need to be removed.
 * @returns - The cleaned string without special characters.
 */
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

/**
 * Generates a slug from a product name and ID.
 * The slug is in the format of "cleaned-name-i-id", where special characters are removed from the name
 * and spaces are replaced with hyphens.
 *
 * @param param - An object containing the name and id.
 * @param param.name - The name to be included in the slug.
 * @param param.id - The id to be appended at the end of the slug.
 * @returns - The generated slug.
 */
export const generateSlugByNameAndId = ({ name, id }: { name: string; id: number }) =>
  removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`

/**
 * Extracts the ID from a slug.
 * Assumes the slug is in the format of "name-i-id" and returns the id part.
 *
 * @param slug - The slug from which the id needs to be extracted.
 * @returns - The extracted id.
 */
export const getIdFromSlug = (slug: string) => {
  const arr = slug.split('-i-')
  return arr[arr.length - 1]
}

/**
 * Extracts the product name from a slug.
 * Assumes the slug is in the format of "cleaned-name-i-id" and returns the cleaned name part.
 *
 * @param slug - The slug from which the name needs to be extracted.
 * @returns - The extracted name with special characters restored.
 */
export const getNameFromSlug = (slug: string) => {
  const arr = slug.split('-i-')
  if (arr.length < 2) return null

  const cleanedName = arr[0].replace(/-/g, ' ')

  return cleanedName
}
