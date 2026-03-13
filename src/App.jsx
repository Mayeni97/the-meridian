import { useState, useEffect } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import ComposePage from "./components/ComposePage"
import FeedPage from "./components/FeedPage"
import SchedulePage from "./components/SchedulePage"

function App() {
  const [schedule, setSchedule] = useState([])
  const [currentPage, setCurrentPage] = useState("feed")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedArticle, setSelectedArticle] = useState(null)


  useEffect(() => {
    if (schedule.length === 0) { return }

    const interval = setInterval(() => {
      const now = new Date()
      const ready = schedule.filter(article => new Date(article.scheduledFor) <= now)
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
    try {
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
      <Header articles={articles} />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {error && (
        <p className="text-red-500 font-mono text-xs text-center py-4">{error}</p>
      )}
      <div className="grid grid-cols-3 gap-0 max-w-6xl mx-auto">
        <div className="col-span-2 border-r border-gray-800">
          {currentPage === "compose" && (
            <ComposePage onPublish={handlePublish} onSchedule={handleSchedule} loading={loading} />
          )}
          {currentPage === "feed" && (
            <FeedPage articles={articles} selectedArticle={selectedArticle} setSelectedArticle={setSelectedArticle} />
          )}
          {currentPage === "scheduled" && (
            <SchedulePage scheduled={schedule} />
          )}
        </div>
        <div className="col-span-1 p-6">
          <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase border-b border-gray-800 pb-3 mb-6">
            Newsroom Stats
          </p>
          <div className="mb-6 pb-6 border-b border-gray-800">
            <p className="text-yellow-600 text-4xl font-black">{articles.length}</p>
            <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mt-1">Articles Published</p>
          </div>
          <div className="mb-6 pb-6 border-b border-gray-800">
            <p className="text-yellow-600 text-4xl font-black">{schedule.length}</p>
            <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mt-1">Scheduled</p>
          </div>
          {articles.length > 0 && (
            <>
              <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase border-b border-gray-800 pb-3 mb-4 mt-6">
                By Topic
              </p>
              {Object.entries(
                articles.reduce((acc, a) => ({
                  ...acc,
                  [a.topic]: (acc[a.topic] || 0) + 1
                }), {})
              ).sort((a, b) => b[1] - a[1]).map(([topic, count]) => (
                <div key={topic} className="flex justify-between py-2 border-b border-gray-900">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">{topic}</span>
                  <span className="font-mono text-xs text-yellow-600">{count}</span>
                </div>
              ))}

              <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase border-b border-gray-800 pb-3 mb-4 mt-6">
                Correspondents
              </p>
              {[...new Set(articles.map(a => a.byline))].map(byline => (
                <div key={byline} className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
                  <span className="font-mono text-xs text-gray-400">{byline}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App