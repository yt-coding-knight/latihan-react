import PuffLoader from "react-spinners/PuffLoader"
import useFetch from "../../hooks/useFetch"
import Button from "../Button"
import Style from "./quote.module.css"

export default function Quote() {
  const url = "https://api.quotable.io/random"
  const { data: quote, isLoading, hasError, setNeedFetching } = useFetch(url)

  async function randomQuote() {
    setNeedFetching(true)
  }

  if (hasError) {
    return (
      <div className={Style.container}>
        <p>gagal menampilkan data. silahkan reload halaman ini</p>
      </div>
    )
  }

  return (
    <div className={Style.container}>
      <h2 className={Style.title}>Quote History</h2>
      {isLoading ? (
        <PuffLoader color="#0284c7" size={40} cssOverride={{ marginBlock: "1rem" }} />
      ) : (
        <>
          <h4 className={Style.quote}>{`"${quote.content}"`}</h4>
          <p className={Style.author}>{quote.author}</p>
        </>
      )}
      <Button onClick={randomQuote} disabled={isLoading}>
        Generate
      </Button>
    </div>
  )
}
