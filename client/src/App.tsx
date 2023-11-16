import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Auth from "./pages/auth/Auth"
import Songs from "./pages/songs/Songs"
import Logout from './pages/auth/Logout'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/song" />
        </Routes>
      </Router>
    </div>
  )
}

export default App