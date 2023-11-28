import { useState, useEffect, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useIonRouter, IonButton } from '@ionic/react';
import ServerClient from '../apis/server'
import { ToastData } from '../definitions';
import PageWrapper from '../components/PageWrapper';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';

interface Props {
  authenticated: boolean | null
  setAuthenticated: (authenticated: boolean) => void;
}

const Song: React.FC<Props> = (
  {
    authenticated,
    setAuthenticated
  }
) => {
  const params: any = useParams();
  const id = params?.id || ''
  const [toast, setToast] = useState<ToastData>({ type: 'success', message: '' });
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [_, setNotes] = useState<string>('');
  const [__, setContent] = useState<string>('');

  const [newName, setNewName] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loadingSong, setLoadingSong] = useState<boolean>(false);

  const url = `/song/${id}`;

  const router = useIonRouter()

  const fetchSong = async () => {
    try {
      setLoadingSong(true);
      const resp = await ServerClient.get(url, { withCredentials: true });
      setLoadingSong(false);

      if (resp.status === 403) { setAuthenticated(false); router.push('/'); }
      if (!resp.data?.success) {
        setToast({ type: 'error', message: resp?.data?.message });
        setToastOpen(true);
      }
      if (resp?.data?.items?.name) {
        setName(resp?.data?.items?.name || '');
        setNewName(resp?.data?.items?.name || '');
      }
      if (resp?.data?.items?.notes) {
        setNotes(resp?.data?.items?.notes || '');
        setNewNotes(resp?.data?.items?.notes || '');
      }
      if (resp?.data?.items?.content) {
        setContent(resp?.data?.items?.content || '');
        setNewContent(resp?.data?.items?.content || '');
      }
    } catch (err) {
      setToastOpen(true);
      setToast({ type: 'error', message: 'An unexpected error occurred.' });
    }
  };

  const updateSong = async () => {
    setLoadingSubmit(true);
    try {
      const resp = await ServerClient.put(
        url,
        { name: newName, notes: newNotes, content: newContent },
        { withCredentials: true }
      );

      setLoadingSubmit(false);

      if (!resp.data?.success) {
        setToast({ type: 'error', message: resp?.data?.message });
        setToastOpen(true);
        return false;
      }

      setToast({ type: 'success', message: 'Updated successfully.' });
      setToastOpen(true);
      return true;
    } catch (err) {
      setLoadingSubmit(false);
      setToast({ type: 'error', message: 'An unexpected error occurred.' });
      setToastOpen(true);
      return false;
    }
  };

  useEffect(() => { if (authenticated === false) router.push('/login'); }, [authenticated]);
  useEffect(() => { fetchSong(); }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const updated = await updateSong();
    if (updated) await fetchSong();
  };

  if (loadingSong) {
    return (
      <PageWrapper name='Loading'>
        <div>Loading...</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper name={name}>
      <div>
        {toastOpen && (
          <Toast
            // type={toast.type}
            // header=''
            toast={toast}
            toastOpen={toastOpen}
            setToastOpen={setToastOpen}
          />
        )}
      </div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        message={'Are you sure you want to leave? All unsaved changes will be lost.'}
        confirmText='Leave'
        onConfirm={() => { setModalOpen(false); router.push('/songs') }}
      // disabled={false}
      />
      <form
        onSubmit={handleSubmit}
      >
        <TextField
          label='Name'
          type='text'
          setValue={setNewName}
          placeholder='...'
          // required={true}
          value={newName}
        // maxWidth='lg'
        />


        <TextArea
          // id='notes'
          label='Notes'
          setValue={setNewNotes}
          placeholder=''
          // required={false}
          value={newNotes}
          rows={newNotes.split('\n').length || 5}
        />

        <TextArea
          // id='content'
          label='Lyrics'
          setValue={setNewContent}
          placeholder=''
          // required={false}
          value={newContent}
          rows={newContent.split('\n').length || 10}
        />

        <IonButton
          type='submit'
          disabled={loadingSubmit}
        >
          Save
        </IonButton>

        <IonButton
          onClick={() => setModalOpen(true)}
          disabled={loadingSubmit}
        >
          Cancel
        </IonButton>
      </form>
    </PageWrapper>
  );
};

export default Song;