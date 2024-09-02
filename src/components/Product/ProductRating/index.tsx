import { HStack } from '@chakra-ui/react'

// Components
import { StarIcon, HalfStarIcon } from '@app/components'

interface IProductRatingProps {
  ratingNumber: number
}

const convertRatingNumberToStars = (ratingNumber: number): React.ReactNode[] => {
  const fullStars = Math.floor(ratingNumber)
  const halfStar = ratingNumber % 1 !== 0
  const totalStars = 5

  return Array.from({ length: totalStars }, (_, i) => {
    if (i < fullStars) {
      return <StarIcon key={i} color="ratingYellow" />
    }
    if (i === fullStars && halfStar) {
      return <HalfStarIcon key={i} color="ratingYellow" />
    }
    return <StarIcon key={i} color="gray.300" />
  })
}

const ProductRating = ({ ratingNumber }: IProductRatingProps) => {
  return <HStack spacing={1}>{convertRatingNumberToStars(ratingNumber)}</HStack>
}

export default ProductRating
