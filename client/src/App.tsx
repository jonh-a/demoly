import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Auth from "./pages/auth/Auth"
import Songs from "./pages/songs/Songs"

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/auth" element={<Auth />} />
          <Route path="/songs" />
          <Route path="/song" />
        </Routes>
      </Router>
    </div>
  )
}

export default App