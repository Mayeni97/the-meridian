function Navbar({currentPage, setCurrentPage}) {
    return (
        <nav className="bg-black border-b border-gray-800 px-8">
            <div className="flex gap-0">
                <button
                    onClick={() => setCurrentPage("compose")}
                    className={`font-mono text-xs tracking-widest uppercase py-5 px-4 border-b-2 transition-colors duration-200 ${
                        currentPage === "compose"
                            ? "border-yellow-600 text-yellow-600"
                            : "text-gray-500 border-transparent hover:text-white"
                    }`}
                >
                    Compose
                </button>
                <button
                    onClick={() => setCurrentPage("scheduled")}
                    className={`font-mono text-xs tracking-widest uppercase py-5 px-4 border-b-2 transition-colors duration-200 ${
                        currentPage === "scheduled"
                            ? "border-yellow-600 text-yellow-600"
                            : "text-gray-500 border-transparent hover:text-white"
                    }`}
                >
                    Scheduled
                </button>
                <button
                onClick={() => setCurrentPage("feed")}
                className={`font-mono text-xs tracking-widest uppercase py-5 px-4 border-b-2 transition-colors duration-200 ${
                    currentPage === "feed"
                        ? "border-yellow-600 text-yellow-600"
                        : "text-gray-500 border-transparent hover:text-white"
    }`}
                >
                    Feed
                </button>
            </div>
        </nav>
    )
}

export default Navbar;