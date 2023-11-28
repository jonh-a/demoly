import { useState, useEffect, SyntheticEvent } from "react";
import PageWrapper from "../components/PageWrapper";
import TextField from "../components/TextField";
import { IonButton, IonItem, IonList, IonRouterLink } from "@ionic/react";
import ServerClient from "../apis/server";
import Toast from "../components/Toast";
import { SongData, ToastData } from "../definitions";
import { useIonRouter } from "@ionic/react";
import Modal from "../components/Modal";

interface Props {
  authenticated: boolean | null;
  setAuthenticated: (authenticated: boolean) => void
}

const Songs: React.FC<Props> = ({
  authenticated,
  setAuthenticated
}) => {
  const [songs, setSongs] = useState<SongData[]>([])
  const [loadingSongs, setLoadingSongs] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastData>({ type: 'success', message: '' });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);
  const router = useIonRouter()

  console.log({ songAuthenticated: authenticated })

  useEffect(() => {
    if (!authenticated) {
      console.log('redirecting to login');
      router.push('/login');
    }
  }, [authenticated]);

  const fetchSongs = async () => {
    try {
      setLoadingSongs(true);
      const resp = await ServerClient.get('/song/mine', { withCredentials: true });
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

  return (
    <PageWrapper name='Songs'>
      <IonList>
        {
          songs
            .map((song: SongData) => (
              <>
                <IonItem routerLink={`/song/${song?._id}`}>
                  {song?.name}
                </IonItem>
                <IonButton
                  className='float-right'
                  onClick={() => {
                    setModalOpen(true)
                    setSelectedSong(song)
                  }}
                >
                  x
                </IonButton>
              </>
            ))
        }
        {
          modalOpen && (
            <Modal
              message={`Are you sure you want to delete ${selectedSong?.name}?`}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={() => deleteSong(selectedSong?._id || '')}
            />
          )
        }
      </IonList>
    </PageWrapper >
  )
}

export default Songs