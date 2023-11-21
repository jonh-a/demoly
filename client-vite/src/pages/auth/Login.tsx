import { useState, SyntheticEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import TextField from "../../components/TextField"
import FormHeader from "../../components/FormHeader"
import Button from "../../components/Button"
import ServerClient from "../../apis/server"
import Container from "../../components/Container"

interface Props {
    authenticated: boolean;
    setAuthenticated: (authenticated: boolean) => void;
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
      const resp = await ServerClient.post('/user/login', {
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
    <Container>
      <form onSubmit={handleSubmit}>
        <FormHeader>
          Login
        </FormHeader>

        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

        <TextField
          id='username'
          label='username'
          type='text'
          setValue={setUsername}
          placeholder='himynameis'
          required={true}
          value={username}
        />

        <TextField
          id='password]'
          label='password'
          type='password'
          setValue={setPassword}
          placeholder=''
          required={true}
          value={password}
        />

        <Button
          type="submit"
          text="Login"
        />

        <div>
          <p><Link to="/register">don't have an account?</Link></p>
        </div>
      </form>
    </Container>
  )
}

export default Login