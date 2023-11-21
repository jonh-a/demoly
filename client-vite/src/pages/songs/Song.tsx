import { useState, useEffect, SyntheticEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ServerClient from '../../apis/server'
import TextField from '../../components/TextField'
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Form from '../../components/Form'
import ButtonSet from '../../components/ButtonSet'
import CancelButton from '../../components/CancelButton'

interface Props {
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => void;
}

const Song: React.FC<Props> = (
  {
    authenticated,
    setAuthenticated
  }
) => {
  const navigate = useNavigate()

  if (!authenticated) navigate('/login')
  const { id = '' } = useParams()
  const [error, setError] = useState('')

  const [name, setName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const [newName, setNewName] = useState<string>('')
  const [newNotes, setNewNotes] = useState<string>('')
  const [newContent, setNewContent] = useState<string>('')

  const url = `/song/${id}`

  const fetchSong = async () => {
    try {
      const resp = await ServerClient.get(url, { withCredentials: true })

      if (resp.status === 403) { setAuthenticated(false); navigate('/') }
      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.items?.name) {
        setName(resp?.data?.items?.name || '')
        setNewName(resp?.data?.items?.name || '')
      }
      if (resp?.data?.items?.notes) {
        setNotes(resp?.data?.items?.notes || '')
        setNewNotes(resp?.data?.items?.notes || '')
      }
      if (resp?.data?.items?.content) {
        setContent(resp?.data?.items?.content || '')
        setNewContent(resp?.data?.items?.content || '')
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    }
  }

  const updateSong = async () => {
    try {
      const resp = await ServerClient.put(
        url,
        { name: newName, notes: newNotes, content: newContent },
        { withCredentials: true }
      )

      if (!resp.data?.success) { setError(resp?.data?.message); return false }
      return true;
    } catch (err) {
      setError("An unexpected error occurred.")
      return false;
    }
  }

  useEffect(() => { fetchSong() }, [])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const updated = await updateSong()
    if (updated) await fetchSong()
    if (!updated) setError('Failed to update.')
  }

  const handleReset = () => {
    setNewName(name)
    setNewNotes(notes)
    setNewContent(content)
  }

  return (
    <Container>
      {error && (<p>{error}</p>)}
      <Form
        onSubmit={handleSubmit}
        header={`Editing ${name}`}
        buttonSet={(<ButtonSet>
          <CancelButton
            text="Cancel"
            onClick={() => navigate('/songs')}
          />
          <Button
            text='Save'
            type='submit'
          />
        </ButtonSet>)}

      >
        <TextField
          id='name'
          label='Name'
          type='text'
          setValue={setNewName}
          placeholder='...'
          required={true}
          value={newName}
          maxWidth='lg'
        />

        <TextArea
          id='notes'
          label='Notes'
          setValue={setNewNotes}
          placeholder=''
          required={false}
          value={newNotes}
          rows={5}
        />

        <TextArea
          id='content'
          label='Lyrics'
          setValue={setNewContent}
          placeholder=''
          required={false}
          value={newContent}
          rows={newContent.split("\n").length || 20}
        />
      </Form>
    </Container>
  )
}

export default Song