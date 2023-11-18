import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  setAuthenticated: (authenticated: boolean) => void;
}

const Logout: React.FC<Props> = ({ setAuthenticated }) => {
  const [___, setRemoved] = useState(false)
  const [_, __, removeCookie] = useCookies(["access_token"])

  const navigate = useNavigate()

  const sendLogout = async () => {
    try {
      const resp = await axios.get('/api/user/logout', { withCredentials: true })
      if (resp.status === 200) {
        setRemoved(true)
        setAuthenticated(false)
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    sendLogout()
    removeCookie('access_token', { path: '/', domain: 'localhost' })
  }, [])

  return (
    <div>Logout</div>
  )
}

export default Logout