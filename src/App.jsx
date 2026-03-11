import { useState } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import ComposePage from "./components/ComposePage"

function App() {
  const[ currentPage, setCurrentPage ] = useState("feed")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  async function handlePublish(prompt, topic, tone) {
    setLoading(true)
    try{
      const { generateArticle } = await import("./utils/api")
      const article = await generateArticle(prompt, topic, tone)
      setArticles(prev => [article, ...prev])
      setCurrentPage("feed")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "compose" && (
        <ComposePage onPublish={handlePublish} loading={loading} />
      )}
    </div>
  )
}

export default App