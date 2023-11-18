import { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

interface Props {
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => void;
}

interface SongData {
  _id: string
  name: string
  userID: string
  notes?: string
  content?: string
  createdAt?: string
  updatedAt?: string
}

const Song: React.FC<Props> = (
  {
    authenticated,
    setAuthenticated
  }
) => {
  const { id = '' } = useParams()
  const [song, setSong] = useState([])
  const [error, setError] = useState('')

  const [name, setName] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const url = `http://localhost:3001/song/${id}`

  const fetchSong = async () => {
    try {
      const resp = await axios.get(url, { withCredentials: true })

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
      const resp = await axios.post(
        url,
        { name, notes, content },
        { withCredentials: true }
      )

      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.items?.name) setName(resp?.data?.items?.name || '')
      if (resp?.data?.items?.notes) setNotes(resp?.data?.items?.notes || '')
      if (resp?.data?.items?.content) setContent(resp?.data?.items?.content || '')
    } catch (err) {
      setError("An unexpected error occurred.")
    }
  }

  useEffect(() => { fetchSong() }, [])

  console.log(song)
  return (
    <div>
      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' onChange={(e) => setName(e.target.value)} value={name} />

        <label htmlFor='notes'>Notes</label>
        <input type='text' id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />

        <label htmlFor='content'>Lyrics</label>
        <input type='textarea' id='content' onChange={(e) => setContent(e.target.value)} value={content} />
      </form>
    </div>
  )
}

export default Song