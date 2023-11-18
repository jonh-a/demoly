import { useState, SyntheticEvent } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button'


interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}


const Auth: React.FC<Props> = ({ authenticated, setAuthenticated }) => {
  return (
    <div>
      <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
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

        <Box>
          <FormControl variant="standard">
            <InputLabel htmlFor='username'>Username: </InputLabel>
            <Input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
        </Box>

        <Box>
          <FormControl variant="standard">
            <label htmlFor='password'>Password: </label>
            <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>

        <div>
          <Button type="submit">Register</Button>
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const resp = await axios.post('http://localhost:3001/user/login', {
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
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

        <Box>
          <FormControl variant="standard">
            <InputLabel htmlFor='username'>Username: </InputLabel>
            <Input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
        </Box>

        <Box>
          <FormControl variant="standard">
            <InputLabel htmlFor='password'>Password: </InputLabel>
            <Input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>


        <Box>
          <Button type="submit">Login</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Auth