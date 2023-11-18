import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

interface Song {
  _id: string;
  name: string;
}

const Songs = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [error, setError] = useState('')
  const url = 'http://localhost:3001/song/mine'

  const fetchSongs = async () => {
    try {
      const resp = await axios.get(url, { withCredentials: true })

      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.items) setSongs(resp?.data?.items || [])
    } catch (err) {
      setError("An unexpected error occurred.")
    }
  }

  useEffect(() => { fetchSongs() }, [])

  console.log(songs)

  return (
    <div>
      {
        songs.map((song: Song) => (
          <div>
            <Link to={`/song/${song?._id}`}>
              {song?.name}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Songs