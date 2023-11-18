import { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import ServerClient from '../../apis/server'

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
  const [_, setMessage] = useState({ message: '', success: true })
  const navigate = useNavigate();

  if (!authenticated) navigate('/auth')

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const resp = await ServerClient.post('/song/new', {
        name
      }, { withCredentials: true })

      if (resp?.status === 403) setAuthenticated(false); navigate('/')
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

        <div>
          <label htmlFor='username'>Give it a name! </label>
          <input type="text" id="username" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default NewSong