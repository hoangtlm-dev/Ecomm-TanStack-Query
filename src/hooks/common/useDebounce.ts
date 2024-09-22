import { useState, useEffect } from 'react'

// Constants
import { TIMES } from '@app/constants'

/**
 * Custom hook to debounce a value.
 *
 * @param value - The value to debounce.
 * @param delayTime - The debounce delay in milliseconds.
 *
 * @returns The debounced value. This value will only update after the specified
 * delay has passed without any changes to the `value` prop.
 */
export const useDebounce = <T>(value: T, delayTime: number = TIMES.DEFAULT_DELAY_TIME): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayTime)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delayTime])

  return debouncedValue
}
