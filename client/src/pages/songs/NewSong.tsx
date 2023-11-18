import { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button'

interface Props {
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => void;
}

const NewSong: React.FC<Props> = (
  {
    authenticated,
    setAuthenticated
  }
) => {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState({ message: '', success: true })
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const resp = await axios.post('http://localhost:3001/song/new', {
        name
      }, { withCredentials: true })

      if (resp?.status !== 200) setMessage({ message: 'Failed to create song.', success: false })
      else if (resp?.data?.id) { navigate(`/song/${resp?.data?.id}`) }
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

        <Box>
          <FormControl variant="standard">
            <InputLabel htmlFor='username'>Give it a name! </InputLabel>
            <Input type="text" id="username" onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </Box>

        <Box>
          <Button type="submit">Create</Button>
        </Box>
      </form>
    </div>
  )
}

export default NewSong