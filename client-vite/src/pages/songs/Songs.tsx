import { useEffect, useState } from 'react'
import ServerClient from '../../apis/server'
import { Link } from 'react-router-dom'

interface Song {
  _id: string;
  name: string;
}

const Songs = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [error, setError] = useState('')
  const url = '/song/mine'

  const fetchSongs = async () => {
    try {
      const resp = await ServerClient.get(url, { withCredentials: true })

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
      {error && <p>{error}</p>}
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