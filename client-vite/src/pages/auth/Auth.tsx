import { useState, SyntheticEvent } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}


const Auth: React.FC<Props> = ({ authenticated, setAuthenticated }) => {
  return (
    <div>
      <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Register />
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
      const resp = await axios.post('/api/user/register', {
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

const Login: React.FC<Props> = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState({ message: '', success: false })

  const navigate = useNavigate()

  if (authenticated) navigate('/songs')

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const resp = await axios.post('/api/user/login', {
        username, password
      }, { withCredentials: true })

      if (resp?.status !== 200) setMessage({ message: 'Failed to sign in.', success: false })
      else { setAuthenticated(true); navigate("/songs") }
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