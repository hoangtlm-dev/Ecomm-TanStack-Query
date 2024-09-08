import { memo } from 'react'
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
import isEqual from 'react-fast-compare'

interface IFilterPricesProps {
  minPrice: number
  maxPrice: number
  currencyUnit?: string
  onFilterByPrices: (priceRange: number[]) => void
}

const FilterPrices = ({ minPrice, maxPrice, currencyUnit = '$', onFilterByPrices }: IFilterPricesProps) => {
  console.log('re-render in filter prices')

  return (
    <Stack p={4} bg="backgroundBlurGray">
      <Heading as="h3" fontSize="textMedium" fontWeight="medium" textTransform="uppercase">
        Prices
      </Heading>
      <Stack>
        <HStack justifyContent="space-between">
          <Text>Ranger:</Text>
          <Text>
            {currencyUnit}
            {minPrice} - {currencyUnit}
            {maxPrice}
          </Text>
        </HStack>
        <RangeSlider
          aria-label={['min', 'max']}
          focusThumbOnChange={false}
          onChangeEnd={onFilterByPrices}
          defaultValue={[minPrice, maxPrice]}
          min={0}
          max={1000}
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

const MemoizedFilterPrices = memo(FilterPrices, isEqual)

export default MemoizedFilterPrices
