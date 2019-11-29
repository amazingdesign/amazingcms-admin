import { useState, useEffect } from 'react'

// from https://usehooks.com/useDebounce/
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay]
  )

  return debouncedValue
}

export default useDebounce