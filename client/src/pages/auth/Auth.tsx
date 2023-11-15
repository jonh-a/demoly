import { useState, SyntheticEvent } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  return (
    <div>
      <Register />

      <Login />
    </div>
  )
}

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({ message: '', success: false })

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const resp = await axios.post('http://localhost:3001/user/register', {
        username, password
      })

      console.log(resp)
    } catch (e: any) {
      if (e?.response?.data?.success === false) {
        setMessage({ success: false, message: e?.response?.data?.message })
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

        <div>
          <label htmlFor='username'>Username: </label>
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({ message: '', success: false })
  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const resp = await axios.post('http://localhost:3001/user/login', {
        username, password
      })

      if (resp.data.token) setCookies("access_token", resp.data.token)
      localStorage.setItem("userID", resp?.data?.userID || '')
      navigate("/songs")
    } catch (e: any) {
      if (e?.response?.data?.success === false) {
        setMessage({ success: false, message: e?.response?.data?.message })
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

        <div>
          <label htmlFor='username'>Username: </label>
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label htmlFor='password'>Password: </label>
          <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Auth