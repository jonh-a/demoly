import { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import ServerClient from '../../apis/server'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Container from '../../components/Container';
import FormHeader from '../../components/FormHeader';
import Form from '../../components/Form'
import ButtonSet from '../../components/ButtonSet'
import CancelButton from '../../components/CancelButton'

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
      <Form
        onSubmit={handleSubmit}
        header="Let's give it a name..."
        buttonSet={(
          <ButtonSet>
            <CancelButton
              text="Cancel"
              onClick={() => navigate('/songs')}
            />
            <Button
              type="submit"
              text="Save"
            />
          </ButtonSet>
        )}
      >

        <TextField
          id='name'
          label='Title'
          type='text'
          setValue={setName}
          placeholder='My Super Creative Song Title'
          required={true}
          value={name}
        />


      </Form>
    </Container>
  )
}

export default NewSong