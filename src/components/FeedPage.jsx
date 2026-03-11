function FeedPage({articles}) {
    if (articles.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-8 py-24 text-center">
                <p className="text-gray-600 font-mono text-xs tracking-widest uppercase mb-4">
                    No articles yet
                </p>
                <p className=" text-gray-700 font-mono text-xs">
                    Go to the compose and publish your first Story
                </p>
            </div>
        )
    }

    return(
        <div className="max-w-2xl mx-auto px-8 py-12">
            <p className="font-mono text-yellow-600 text-xs tracking-widest uppercase mb-8">
                {articles.length} {articles.length === 1 ? "Article" : "Articles"} Published
            </p>
            {articles.map(article => (
                <div key={article.id} className="border-b border-gray-800 py-8">
                    <div className="flex gap-3 mb-3">
                        <span className="font-mono text-xs text-yellow-600 tracking-widest uppercase">
                            {article.topic}
                        </span>
                        <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">
                            {article.tone}                          
                        </span>
                    </div>
                    <h2 className="text-white text-2xl font-black mb-2 leading-tight">
                        {article.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 font-mono italic">
                        {article.subtitle}
                    </p>
                        <div className="mt-4">
                            {article.body.split("\n\n").map((paragraph, index) => (
                                <p key={index} className="font-mono text-xs text-white">
                                    {paragraph}
                                </p>
                            ))}
                            <p className="font-mono text-xs text-gray-600">
                                By {article.byline} on {article.publishedAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

export default FeedPage