function Header({ articles }) {
  const tickerText = articles.length > 0
    ? articles.map(a => `  ·  ${a.tone.toUpperCase()}: ${a.title}`).join("")
    : "  ·  Welcome to The Meridian — Your AI-Powered Global Newsroom  ·  Assign a correspondent to begin publishing"

  return (
    <header>
      <div className="bg-black border-b border-yellow-600 text-center py-8">
        <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase mb-2">
          Est. 2026 · AI Powered Global Journalism
        </p>
        <h1 className="text-white text-6xl font-black uppercase tracking-tight">
          The Meridian
        </h1>
        <p className="text-gray-500 text-xs tracking-widest uppercase mt-2">
          Your Daily Dose of Truth
        </p>
      </div>

      <div className="bg-yellow-600 overflow-hidden h-8 flex items-center">
        <div className="bg-black text-yellow-600 font-mono text-xs font-bold tracking-widest uppercase px-4 h-full flex items-center shrink-0">
          ⬡ LIVE
        </div>
        <div className="overflow-hidden">
          <p className="whitespace-nowrap font-mono text-xs text-black font-medium animate-ticker">
            {tickerText}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header