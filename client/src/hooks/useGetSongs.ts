import { useEffect, useState } from "react"
import axios from 'axios'

export const useGetSongs = async () => {
  const [songs, setSongs] = useState([])
  const [error, setError] = useState('')

  // const { headers } = useGetToken()
  const url = 'http://localhost:3001/song/mine'

  const fetchSongs = async () => {
    try {
      const resp = await axios.get(url, { withCredentials: true })

      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.songs) setSongs(resp?.data?.songs)
    } catch (err) {
      setError("An unexpected error occurred.")
    }
  }

  useEffect(() => { fetchSongs() }, [])

  return { songs };
}