import {
  Heading,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text
} from '@chakra-ui/react'

interface IFilterPricesProps {
  minPrice: number
  maxPrice: number
  unitPrice?: string
  onFilterPrices: (priceRange: number[]) => void
}

const FilterPrices = ({ minPrice, maxPrice, unitPrice = '$', onFilterPrices }: IFilterPricesProps) => {
  return (
    <Stack p={4} bg="backgroundBlurGray">
      <Heading as="h3" fontSize="textMedium" fontWeight="medium" textTransform="uppercase">
        Prices
      </Heading>
      <Stack>
        <HStack justifyContent="space-between">
          <Text>Ranger:</Text>
          <Text>
            {unitPrice}
            {minPrice} - {unitPrice}
            {maxPrice}
          </Text>
        </HStack>
        <RangeSlider
          aria-label={['min', 'max']}
          focusThumbOnChange={false}
          onChangeEnd={(priceRange) => onFilterPrices(priceRange)}
          defaultValue={[minPrice, maxPrice]}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack bg="backgroundLightBlue" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} boxSize={5} bg="backgroundLightBlue" border="3px solid white" />
          <RangeSliderThumb index={1} boxSize={5} bg="backgroundLightBlue" border="3px solid white" />
        </RangeSlider>
      </Stack>
    </Stack>
  )
}

export default FilterPrices
