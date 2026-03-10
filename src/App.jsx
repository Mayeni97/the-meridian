import { useState } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import ComposePage from "./components/ComposePage"

function App() {
  const[ currentPage, setCurrentPage ] = useState("feed")
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "compose" && <ComposePage /> }
    </div>
  )
}

export default App