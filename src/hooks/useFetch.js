import { useEffect, useState } from "react"

export default function useFetchQuote(url, page) {
  const [data, setData] = useState({})
  const [needFetching, setNeedFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  async function getData(controller) {
    setIsLoading(true)

    try {
      const signal = controller.signal
      const res = await fetch(url, { signal })

      if (!res.ok) throw Error("fail to fetch")

      const json = await res.json()

      if (page) {
        if (page >= 2) {
          setData((old) => ({
            ...json,
            results: [...old.results, ...json.results],
          }))
        } else {
          setData(json)
        }
      } else {
        setData(json)
      }
      setIsLoading(false)
    } catch (error) {
      if (error.name === "AbortError") return

      setHasError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    if (hasError) {
      setHasError(false)
    }

    getData(controller)

    if (needFetching) {
      setNeedFetching(false)
    }
    return () => {
      controller.abort()
    }
  }, [needFetching, page])

  return { data, isLoading, hasError, setNeedFetching }
}
