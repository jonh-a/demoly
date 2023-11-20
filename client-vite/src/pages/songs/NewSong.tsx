import { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import ServerClient from '../../apis/server'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Container from '../../components/Container';
import FormHeader from '../../components/FormHeader';

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
    <Container>
      <div>
      <form onSubmit={handleSubmit}>
        <FormHeader>
          Let's give it a name!
        </FormHeader>
        
        <TextField
          id='name'
          label=''
          type='text'
          setValue={setName}
          placeholder='My Super Creative Song Title'
          required={true}
          value={name}
        />

        <Button
          type="submit"
          text="Save"
        />
      </form>
      </div>
    </Container>
  )
}

export default NewSong