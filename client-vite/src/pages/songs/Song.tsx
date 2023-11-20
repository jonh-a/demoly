import { useState, useEffect, SyntheticEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ServerClient from '../../apis/server'
import TextField from '../../components/TextField'
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Container from '../../components/Container'

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

  if (!authenticated) navigate('/auth')
  console.log({ setAuthenticated })

  const { id = '' } = useParams()
  const [error, setError] = useState('')

  const [name, setName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const url = `/song/${id}`

  const fetchSong = async () => {
    try {
      const resp = await ServerClient.get(url, { withCredentials: true })

      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.items?.name) setName(resp?.data?.items?.name || '')
      if (resp?.data?.items?.notes) setNotes(resp?.data?.items?.notes || '')
      if (resp?.data?.items?.content) setContent(resp?.data?.items?.content || '')
    } catch (err) {
      setError("An unexpected error occurred.")
    }
  }

  const updateSong = async () => {
    try {
      const resp = await ServerClient.put(
        url,
        { name, notes, content },
        { withCredentials: true }
      )

      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.items?.name) setName(resp?.data?.items?.name || '')
      if (resp?.data?.items?.notes) setNotes(resp?.data?.items?.notes || '')
      if (resp?.data?.items?.content) setContent(resp?.data?.items?.content || '')
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

  return (
    <Container>
      {error && (<p>{error}</p>)}
      <form onSubmit={handleSubmit}>
        <TextField
          id='name'
          label='Name'
          type='text'
          setValue={setName}
          placeholder='...'
          required={true}
          value={name}
        />

        <TextArea
          id='notes'
          label='Notes'
          setValue={setNotes}
          placeholder=''
          required={false}
          value={notes}
          rows={5}
        />

        <TextArea
          id='content'
          label='Content'
          setValue={setContent}
          placeholder=''
          required={false}
          value={content}
          rows={content.split("\n").length || 20}
        />

        <Button
          type="submit"
          text="Save"
        />
      </form>
    </Container>
  )
}

export default Song