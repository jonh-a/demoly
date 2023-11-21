import { useEffect, useState } from 'react'
import ServerClient from '../../apis/server'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../../components/Container'
import timeAgoFromString from '../../util/timeAgo'
import { TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  authenticated: boolean
}

interface Song {
  _id: string;
  name: string;
  updatedAt?: string;
}

const Songs: React.FC<Props> = ({ authenticated }) => {
  const [songs, setSongs] = useState<Song[]>([])
  const [error, setError] = useState('')
  const url = '/song/mine'
  const navigate = useNavigate()
  if (!authenticated) navigate('/login')

  const fetchSongs = async () => {
    try {
      const resp = await ServerClient.get(url, { withCredentials: true })

      if (!resp.data?.success) setError(resp?.data?.message)
      if (resp?.data?.items) setSongs(resp?.data?.items || [])
    } catch (err) {
      setError("An unexpected error occurred.")
    }
  }



  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <Container maxWidth="xl">
      {error && <p>{error}</p>}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Last Modified</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {
            songs.map((song: Song) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={song?._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link to={`/song/${song?._id}`}>
                    {song?.name}
                  </Link>
                </th>
                <td className="px-6 py-4">
                  {song?.updatedAt && timeAgoFromString(song?.updatedAt)}
                </td>
                <td className="px-6 py-4 float-right">
                  <Link to={`/song/delete/${song?._id}`}>
                    {<TrashIcon className='h-6 w-6' />}
                  </Link>
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