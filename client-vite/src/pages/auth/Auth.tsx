import { useState, SyntheticEvent } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Container from '../../components/Container';

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Auth: React.FC<Props> = ({ authenticated, setAuthenticated }) => {
  return (
    <Container>
      <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Register />
    </Container>
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
        <article className="format lg:format-lg">
          <h3>Register</h3>
        </article>

        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

        <TextField
          id='username'
          label='Username'
          type='text'
          setValue={setUsername}
          placeholder='himynameis'
          required={true}
          value={username}
        />

        <TextField
          id='password]'
          label='Password'
          type='password'
          setValue={setPassword}
          placeholder=''
          required={true}
          value={password}
        />

        <Button
          type="submit"
          text="Register"
        />
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
        <article className="format lg:format-lg">
          <h3>Login</h3>
        </article>

        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

        <TextField
          id='username'
          label='Username'
          type='text'
          setValue={setUsername}
          placeholder='himynameis'
          required={true}
          value={username}
        />

        <TextField
          id='password]'
          label='Password'
          type='password'
          setValue={setPassword}
          placeholder=''
          required={true}
          value={password}
        />

        <Button
          type="submit"
          text="Register"
        />
      </form>
    </div>
  )
}

export default Auth