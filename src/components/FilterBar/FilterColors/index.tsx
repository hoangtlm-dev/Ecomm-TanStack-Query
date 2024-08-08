import { Box, Button, Heading, HStack, Stack } from '@chakra-ui/react'

interface IFilterColorsProps {
  colors: string[]
  activeColor?: string | null
  onFilterByColors: (color: string) => void
}

const FilterColors = ({ colors, activeColor = 'null', onFilterByColors }: IFilterColorsProps) => {
  return (
    <Stack p={4} bg="backgroundBlurGray" gap={4}>
      <Heading as="h3" fontSize="textMedium" fontWeight="medium" textTransform="uppercase">
        Colors
      </Heading>
      <HStack gap={4}>
        {colors.map((color) => (
          <Box
            key={color}
            borderRadius="50%"
            boxSize={6}
            borderWidth={1}
            borderColor={activeColor === color ? 'borderPrimary' : 'none'}
          >
            <Button
              display="block"
              bg={color}
              minW="unset"
              boxSize="100%"
              borderRadius="50%"
              p={2}
              _hover={{ opacity: 0.6 }}
              _active={{
                border: '3px solid white'
              }}
              onClick={() => onFilterByColors(color)}
              isActive={activeColor === color}
            />
          </Box>
        ))}
      </HStack>
    </Stack>
  )
}

export default FilterColors
