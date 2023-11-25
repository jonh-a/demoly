import { useEffect, useState } from 'react';
import ServerClient from '../../apis/server';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import timeAgoFromString from '../../util/timeAgo';
import { TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import { ToastData } from '../../definitions';
import Spinner from '../../components/Spinner';

interface Props {
  authenticated: boolean
}

interface Song {
  _id: string;
  name: string;
  updatedAt?: string;
}

const Songs: React.FC<Props> = ({ authenticated }) => {
  const [toast, setToast] = useState<ToastData>({ type: 'success', message: '' });
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingSongs, setLoadingSongs] = useState<boolean>(false);

  const url = '/song/mine';

  const navigate = useNavigate();
  //if (!authenticated) navigate('/login');

  const fetchSongs = async () => {
    try {
      setLoadingSongs(true);
      const resp = await ServerClient.get(url, { withCredentials: true });
      setLoadingSongs(false);

      if (!resp.data?.success) {
        setToast({
          type: 'error',
          message: resp?.data?.message || 'An unexpected error occurred.'
        });
        setToastOpen(true);
      }
      if (resp?.data?.items) setSongs(resp?.data?.items || []);
    } catch (err) {
      setToast({ type: 'error', message: 'An unexpected error occurred.' });
      setToastOpen(true);
    }
  };

  const deleteSong = async (id: string) => {
    const deleteUrl = `/song/${id}`;
    try {
      setLoadingDelete(true);
      const resp = await ServerClient.delete(deleteUrl, { withCredentials: true });
      setLoadingDelete(false);

      if (resp.data?.success) {
        setModalOpen(false);
        setSelectedSong(null);
        fetchSongs();
      }
      if (!resp.data?.success) {
        setToast({ type: 'error', message: 'An unexpected error occurred.' });
        setToastOpen(true);
      }
      if (resp?.data?.items) setSongs(resp?.data?.items || []);
    } catch (err) {
      setLoadingDelete(false);
      setToast({ type: 'error', message: 'An unexpected error occurred.' });
      setToastOpen(true);
    }
  };

  useEffect(() => { fetchSongs(); }, []);
  useEffect(() => {
    if (!authenticated) navigate('/login');
  }, [authenticated]);

  if (loadingSongs) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="2xl">
      {toastOpen && (
        <Toast
          type={toast.type}
          header=''
          text={toast.message}
          open={toastOpen}
          setOpen={setToastOpen}
        />
      )}
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        header={`Delete ${selectedSong?.name}`}
        text={`Are you sure you want to delete ${selectedSong?.name}?`}
        confirmText='Delete'
        onConfirm={() => deleteSong(selectedSong?._id || '')}
        disabled={loadingDelete}
      />
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
                  <Link to={'#'}>
                    {
                      <TrashIcon
                        className='h-6 w-6'
                        onClick={() => {
                          setSelectedSong(song);
                          setModalOpen(true);
                        }}
                      />
                    }
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  );
};

export default Songs;