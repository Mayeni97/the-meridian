import { useState, useEffect } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import ComposePage from "./components/ComposePage"
import FeedPage from "./components/FeedPage"
import SchedulePage from "./components/SchedulePage"

function App() {
  const [schedule, setSchedule] = useState([])
  const[ currentPage, setCurrentPage ] = useState("feed")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (schedule.length === 0) { return }

      const interval = setInterval(() => {
        const now = new Date()
        const ready = schedule.filter(article => new Date(article.scheduledFor) <= now )
        const stillWaiting = schedule.filter(article => new Date(article.scheduledFor) > now)

        if (ready.length > 0) {
          setArticles(prev => [...ready, ...prev])
          setSchedule(stillWaiting)
        }
      }, 5000)

      return () => clearInterval(interval)
    }, [schedule])
  

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

  async function handleSchedule(prompt, topic, tone, scheduleTime) {
  setLoading(true)
  try {
    const { generateArticle } = await import("./utils/api")
    const article = await generateArticle(prompt, topic, tone)
    setSchedule(prev => [...prev, { ...article, scheduledFor: new Date(scheduleTime) }])
    setCurrentPage("scheduled")
  } catch (error) {
    console.error(error)
    setError("Failed to schedule article. Please try again.")
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
        <ComposePage onPublish={handlePublish}
         onSchedule={handleSchedule} 
         loading={loading} />
      )}
      {currentPage === "feed" && 
        <FeedPage articles={articles} />}

        {currentPage === "scheduled" && (
          <SchedulePage scheduled={schedule} />
          
        )}
    </div>
  )
}

export default App