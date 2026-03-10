import { useState } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"

function App() {
  const[ currentPage, setCurrentPage ] = useState("feed")
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default App