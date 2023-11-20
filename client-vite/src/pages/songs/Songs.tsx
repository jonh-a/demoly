import { useEffect, useState } from 'react'
import ServerClient from '../../apis/server'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'

interface Song {
  _id: string;
  name: string;
  updatedAt?: string;
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
    <Container>
      {error && <p>{error}</p>}
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Last Modified</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
        {
          songs.map((song: Song) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/song/${song?._id}`}>
                  {song?.name}
                </Link>
              </th>
              <td class="px-6 py-4">
                {song?.updatedAt}
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </Container>
  )
}

export default Songs