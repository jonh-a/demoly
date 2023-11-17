import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Navbar from "./components/Navbar"
import Auth from "./pages/auth/Auth"
import Songs from "./pages/songs/Songs"
import Logout from './pages/auth/Logout'

import Container from '@mui/material/Container';

const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  return (
    <Router>
      <Navbar authenticated={authenticated} />
      <Routes>
        <Route path="/" />
        <Route path="/auth" element={<Auth authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/song" />
      </Routes>
    </Router>
  )
}

export default App