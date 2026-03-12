import { useState } from "react"

const TOPICS = [
  "World Affairs", "Technology", "Health", "Sports", "Entertainment", "Science", "Business", "Politics", "Education", "Travel", "Arts"]

const TONES = ["Investigative", "Analytical", "Breaking", "Opinionated", "Feature", "Persuasive"]

function ComposePage({ onPublish, loading, onSchedule }) {
    const [prompt, setPrompt] = useState("")
    const [topic, setTopic] = useState(TOPICS[0])
    const [tone, setTone] = useState(TONES[0])
    const [scheduleTime, setScheduleTime] = useState("")
    const [scheduleMode, setScheduleMode] = useState(false)
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

                    <div className="mb-6">
                    <label className="font-mono text-gray-500 text-xs tracking-widest uppercase block mb-2">
                        Schedule Publication
                    </label>
                    <div 
                        onClick={() => setScheduleMode(s => !s)}
                        className="flex items-center gap-3 cursor-pointer mb-4"
                    >
                        <div className={`w-10 h-5 rounded-full transition-colors ${scheduleMode ? 'bg-yellow-600' : 'bg-gray-700'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-all ${scheduleMode ? 'ml-5' : 'ml-0.5'}`} />
                        </div>
                        <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                        {scheduleMode ? 'Scheduled' : 'Publish Immediately'}
                        </span>
                    </div>

                    {scheduleMode && (
                        <><input
                            type="datetime-local"
                            value={scheduleTime}
                            onChange={e => setScheduleTime(e.target.value)}
                            className="w-full bg-black border border-gray-700 text-white font-mono text-sm p-3 rounded-sm focus:outline-none focus:border-yellow-600" /><p className="font-mono text-xs text-gray-600 mt-2">
                                e.g Date: 03/12/2026 Time: 09:00 AM
                            </p></>
                    )}
                    </div>

                    <button
                    onClick={() => scheduleMode 
                        ? onSchedule(prompt, topic, tone, scheduleTime)
                        : onPublish(prompt, topic, tone)
                    }
                    disabled={loading || !prompt.trim() || (scheduleMode && !scheduleTime)}
                    className={`font-mono text-xs tracking-widest uppercase font-bold px-8 py-4 transition-colors ${
                        loading || !prompt.trim() || (scheduleMode && !scheduleTime)
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-600 text-black hover:bg-yellow-500 cursor-pointer'
                    }`}
                    >
                    {loading ? 'Writing...' : scheduleMode ? '⏱ Schedule Article' : '⚡ Publish Now'}
                    </button>

            </div>
        </div>
    )
}

export default ComposePage               

            