import { useEffect, useState } from "react"

export default function useSessionStorage(
  key: string,
  initialValue: number
) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = sessionStorage.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)
    }
    return initialValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
    return () => {
      sessionStorage.removeItem(key)
    };
  }, [key, value])

  return [value, setValue]
}