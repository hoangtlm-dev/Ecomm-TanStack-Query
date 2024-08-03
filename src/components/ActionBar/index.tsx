import { HStack, IconButton, Select, Text } from '@chakra-ui/react'

// Components
import { ArrowDownIcon, GridIcon, HamburgerIcon } from '@app/components'

interface IActionBarProps {
  totalItems: number
  sortOptions: string[]
  showOptions: number[]
  listType: 'grid' | 'list'
  onSortItems: (value: string) => void
  onShowItems: (value: number) => void
}

const ActionBar = ({ totalItems, sortOptions, showOptions, listType, onSortItems, onShowItems }: IActionBarProps) => {
  return (
    <HStack
      px={4}
      py={2}
      justifyContent="space-between"
      backgroundColor="backgroundBlurGray"
      position={{ md: 'relative' }}
      flexDirection={{ base: 'column', md: 'row' }}
      gap={4}
    >
      <HStack gap={{ base: 4, md: 8 }} flexDirection={{ base: 'column', sm: 'row' }}>
        <Text fontSize="textSmall">{totalItems} Items</Text>
        <HStack gap={4}>
          <Text fontSize="textSmall" whiteSpace="nowrap">
            Sort By
          </Text>
          <Select icon={<ArrowDownIcon />} iconSize="8px" minW="120px" onChange={(e) => onSortItems(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </HStack>
        <HStack gap={4}>
          <Text fontSize="textSmall">Show</Text>
          <Select
            icon={<ArrowDownIcon />}
            iconSize="8px"
            minW="120px"
            onChange={(e) => onShowItems(Number(e.target.value))}
          >
            {showOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
      <HStack display={{ base: 'none', md: 'flex' }} position={{ md: 'absolute' }} right={0} top={0} bottom={0} gap={0}>
        <IconButton
          variant="ghost"
          aria-label="Product grid"
          backgroundColor={listType === 'grid' ? '#f1f3f4' : ''}
          borderRadius={0}
          h="full"
          px={5}
          py={{ base: 5, md: 'auto' }}
          icon={<GridIcon boxSize={5} color={listType === 'grid' ? 'iconActive' : 'iconGray'} />}
        />
        <IconButton
          variant="ghost"
          aria-label="Product list"
          backgroundColor={listType === 'list' ? '#f1f3f4' : ''}
          borderRadius={0}
          h="full"
          px={5}
          py={{ base: 5, md: 'auto' }}
          icon={<HamburgerIcon boxSize={5} color={listType === 'list' ? 'iconActive' : 'iconGray'} />}
        />
      </HStack>
    </HStack>
  )
}

export default ActionBar
