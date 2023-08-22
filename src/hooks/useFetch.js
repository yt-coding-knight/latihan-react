import { useEffect, useState } from "react"

export default function useFetchQuote(url, page) {
  const [data, setData] = useState({})
  const [needFetching, setNeedFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function getData(controller) {
    setIsLoading(true)
    const signal = controller.signal
    const res = await fetch(url, { signal })
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
  }

  useEffect(() => {
    const controller = new AbortController()

    getData(controller)

    if (needFetching) {
      setNeedFetching(false)
    }
    return () => {
      controller.abort()
    }
  }, [needFetching, page])

  return { data, isLoading, setNeedFetching }
}
