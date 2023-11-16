import { useState, SyntheticEvent, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [removed, setRemoved] = useState(false)
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"])

  useEffect(() => {
    removeCookie("access_token", { path: '/' })
  }, [])

  return (
    <div>Logout</div>
  )
}

export default Logout