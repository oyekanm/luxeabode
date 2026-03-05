import { useEffect, useRef } from 'react'

interface ArgsProps {
  cb: () => void
}

// export const useDebounce = <T>(c: T, delay = 500) => {
export const useDebounce = (delay = 1000) => {
  const timeout = useRef<NodeJS.Timeout | null>(null)

  // Clean up the timeout if the component using the hook unmounts
  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  return ({ cb }: ArgsProps) => {
    // console.log("clearing timeout");
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      cb()
    }, delay)

    // return () => clearTimeout(timeout);
  }
}
