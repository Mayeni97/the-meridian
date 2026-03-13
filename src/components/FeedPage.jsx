function FeedPage({ articles, selectedArticle, setSelectedArticle }) {

    function downloadArticle(article) {
        const content = `${article.title}
        ${"=".repeat(article.title.length)}
        
        By ${article.byline}
        Published: ${article.publishedAt.toLocaleDateString()}
        Topic: ${article.topic} | Tone: ${article.tone}

        ${article.body}

        --------------------------
        Published by The Meridian`

        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${article.title.toLowerCase().replace(/\s+/g, "-")}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }
        
  if (selectedArticle) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-12">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="font-mono text-xs text-gray-500 tracking-widest uppercase border border-gray-800 px-4 py-2 mb-8 hover:border-yellow-600 hover:text-yellow-600 transition-colors"
        >
           Back to Feed
        </button>
        <div className="flex gap-3 mb-4">
          <span className="font-mono text-xs text-yellow-600 tracking-widest uppercase">
            {selectedArticle.topic}
          </span>
          <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">
            {selectedArticle.tone}
          </span>
        </div>
        <h1 className="text-white text-4xl font-black mb-3 leading-tight">
          {selectedArticle.title}
        </h1>
        <p className="text-gray-400 text-lg italic mb-4 font-mono">
          {selectedArticle.subtitle}
        </p>
        <div className="border-t border-b border-gray-800 py-3 mb-8">
          <p className="font-mono text-xs text-gray-500">
            By <span className="text-yellow-600">{selectedArticle.byline}</span> · {selectedArticle.publishedAt.toLocaleDateString()}
          </p>
        </div>
        <div>
          {selectedArticle.body.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-white text-base leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
        {selectedArticle.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-800">
            {selectedArticle.tags.map(tag => (
              <span key={tag} className="font-mono text-xs text-yellow-600 border border-gray-800 px-3 py-1 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-8">
          <button
            onClick={() => downloadArticle(selectedArticle)}
            className="font-mono text-xs text-gray-500 tracking-widest uppercase border border-gray-800 px-4 py-2 hover:border-yellow-600 hover:text-yellow-600 transition-colors"
          >
            Download Article
          </button>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-24 text-center">
        <p className="text-gray-600 font-mono text-xs tracking-widest uppercase mb-4">
          No articles yet
        </p>
        <p className="text-gray-700 font-mono text-xs">
          Go to Compose and publish your first story
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase mb-8">
        {articles.length} {articles.length === 1 ? "Article" : "Articles"} Published
      </p>
      {articles.map(article => (
        <div 
          key={article.id} 
          onClick={() => setSelectedArticle(article)}
          className="border-b border-gray-800 py-8 cursor-pointer group"
        >
          <div className="flex gap-3 mb-3">
            <span className="font-mono text-xs text-yellow-600 tracking-widest uppercase">
              {article.topic}
            </span>
            <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">
              {article.tone}
            </span>
          </div>
          <h2 className="text-white text-2xl font-black mb-2 leading-tight group-hover:text-yellow-600 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-400 text-sm mb-4 font-mono italic">
            {article.subtitle}
          </p>
          <p className="font-mono text-xs text-gray-600">
            By {article.byline} · {article.publishedAt.toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default FeedPage