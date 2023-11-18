import { useState, useEffect, SyntheticEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ServerClient from '../../apis/server'

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
    <div>
      {error && (<p>{error}</p>)}
      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' onChange={(e) => setName(e.target.value)} value={name} />

        <label htmlFor='notes'>Notes</label>
        <input type='text' id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />

        <label htmlFor='content'>Lyrics</label>
        <input type='textarea' id='content' onChange={(e) => setContent(e.target.value)} value={content} />

        <button type='submit' onClick={handleSubmit}>Save</button>
      </form>
    </div>
  )
}

export default Song