import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from "./components/Navbar"
import Auth from "./pages/auth/Auth"
import Songs from "./pages/songs/Songs"
import Song from "./pages/songs/Song"
import Logout from './pages/auth/Logout'
import NewSong from "./pages/songs/NewSong"

const App = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const checkIfAuthenticated = async () => {
    try {
      const resp = await axios.get('/api/user/authenticated', { withCredentials: true })
      if (resp.status === 200) setAuthenticated(true)
      else setAuthenticated(false)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkIfAuthenticated()
  }, [])

  return (
    <Router>
      <Navbar authenticated={authenticated} />
      <Routes>
        <Route path="/" />
        <Route path="/auth" element={<Auth authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
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