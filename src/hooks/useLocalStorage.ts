import { useEffect, useState } from "react"

export default function useLocalStorage(
  key: string,
  initialValue: number
) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}