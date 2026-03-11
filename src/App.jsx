import { useState } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import ComposePage from "./components/ComposePage"
import FeedPage from "./components/FeedPage"

function App() {
  const[ currentPage, setCurrentPage ] = useState("feed")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handlePublish(prompt, topic, tone) {
    setLoading(true)
    try{
      const { generateArticle } = await import("./utils/api")
      const article = await generateArticle(prompt, topic, tone)
      setArticles(prev => [article, ...prev])
      setCurrentPage("feed")
    } catch (error) {
      console.error(error)
      setError("Failed to generate article. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {error && (
        <p className="text-red-500 font-mono text-xs text-center py-4">{error}</p>
      )}
      {currentPage === "compose" && (
        <ComposePage onPublish={handlePublish} loading={loading} />
      )}
      {currentPage === "feed" && 
        <FeedPage articles={articles} />}
    </div>
  )
}

export default App