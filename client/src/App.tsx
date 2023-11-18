import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Navbar from "./components/Navbar"
import Auth from "./pages/auth/Auth"
import Songs from "./pages/songs/Songs"
import Song from "./pages/songs/Song"
import Logout from './pages/auth/Logout'
import NewSong from "./pages/songs/NewSong"

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
        <Route path="/new" element={<NewSong authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/song">
          <Route path=":id" element={<Song authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App