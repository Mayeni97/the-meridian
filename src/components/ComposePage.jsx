import { useState } from "react"

const TOPICS = [
  "World Affairs", "Technology", "Health", "Sports", "Entertainment", "Science", "Business", "Politics", "Education", "Travel", "Arts"]

const TONES = ["Investigative", "Analytical", "Breaking", "Opinionated", "Feature", "Persuasive"]

function ComposePage({ onPublish, loading }) {
    const [prompt, setPrompt] = useState("")
    const [topic, setTopic] = useState(TOPICS[0])
    const [tone, setTone] = useState(TONES[0])
    return (
        <div className="max-w-2xl mx-auto px-8 py-12">
            <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase mb-2">
                Editorial Desk
            </p>
            <h2 className="text-white text-4xl font-black mb-8">
                Brief Your Correspondent
            </h2>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-sm">

                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <label className="font-mono text-gray-500 text-xs tracking-widest uppercase block mb-2">
                            Topic
                        </label>
                        <select
                        value ={topic}
                        onChange={(e) => setTopic(e.target.value)} 
                        className="w-full bg-black border border-gray-700 text-white font-mono text-sm p-3 rounded-sm">
                            {TOPICS.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="font-mono text-gray-500 text-xs tracking-widest uppercase block mb-2">
                            Tone
                        </label>
                        <select 
                        value ={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-black border border-gray-700 text-white font-mono text-sm p-3 rounded-sm">
                            {TONES.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="font-mono text-gray-500 text-xs tracking-widest uppercase block mb-2">
                        Story Brief
                    </label>
                    <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={5}
                    placeholder="e.g the global impact of AI on journalism jobs in 2026"
                    className="w-full bg-black border border-gray-700 text-white font-mono text-sm p-3 rounded-sm resize-none focus:outline-none focus:border-yellow-600"
                    />
                    </div>

                    <button
                    onClick={() => onPublish(prompt, topic, tone)}
                    disabled={loading || !prompt.trim()}
                    className={`font-mono text-xs tracking-widest uppercase font-bold px-8 py-4 transition-colors ${
                        loading || !prompt.trim()
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-600 text-black hover:bg-yellow-500 cursor-pointer'
                    }`}
                    >
                    {loading ? 'Writing...' : ' Publish Now'}
                    </button>

            </div>
        </div>
    )
}

export default ComposePage               

            