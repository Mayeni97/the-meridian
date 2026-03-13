const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

export async function generateArticle(prompt, topic, tone) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are a world class journalist writing for The Meridian, a prestigious global news publication.
              
                Write a ${tone} article about: "${prompt}"
                Topic category: ${topic}
                
                The article must have at least 6 substantial paragraphs. Each paragraph should be 4-5 sentences long. Be detailed, insightful and thorough like a New York Times feature piece.

                Respond with JSON only, no markdown, no backticks. Use this exact structure:
                {
                  "title": "article title here",
                  "subtitle": "article subtitle here",
                  "body": "full article body here with paragraphs separated by double newlines",
                  "tags": ["tag1", "tag2", "tag3"],
                  "byline": "Journalist Full Name"
                }`
            }
          ]
        }
      ]
    })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  const text = data.candidates[0].content.parts[0].text
  const clean = text.replace(/```json|```/g, "").trim()
  const parsed = JSON.parse(clean)

  return {
    id: Date.now(),
    title: parsed.title,
    subtitle: parsed.subtitle,
    body: parsed.body,
    tags: parsed.tags,
    topic,
    tone,
    byline: parsed.byline,
    publishedAt: new Date()
  }
}