import { useState, useEffect, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ServerClient from '../../apis/server';
import TextField from '../../components/TextField';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Form from '../../components/Form';
import ButtonSet from '../../components/ButtonSet';
import CancelButton from '../../components/CancelButton';
import Modal from '../../components/Modal';
import Recorder from '../../components/Recorder';
import Toast from '../../components/Toast';
import { ToastData } from '../../definitions';
import Spinner from '../../components/Spinner';

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
  const { id = '' } = useParams();
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

  const navigate = useNavigate();

  useEffect(() => { if (!authenticated) navigate('/login'); }, [authenticated]);

  const fetchSong = async () => {
    try {
      setLoadingSong(true);
      const resp = await ServerClient.get(url, { withCredentials: true });
      setLoadingSong(false);

      if (resp.status === 403) { setAuthenticated(false); navigate('/'); }
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

  useEffect(() => { fetchSong(); }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const updated = await updateSong();
    if (updated) await fetchSong();
  };

  if (loadingSong) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
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
        header={'Are you sure you want to leave?'}
        text={'All unsaved changes will be lost.'}
        confirmText='Leave'
        onConfirm={() => navigate('/')}
        disabled={false}
      />
      <Form
        onSubmit={handleSubmit}
        header={`Editing ${name}`}
        buttonSet={(<ButtonSet>
          <CancelButton
            text="Cancel"
            onClick={() => setModalOpen(true)}
            disabled={loadingSubmit}
          />
          <Button
            text='Save'
            type='submit'
            disabled={loadingSubmit}
          />
        </ButtonSet>)}

      >
        <TextField
          id='name'
          label='Name'
          type='text'
          setValue={setNewName}
          placeholder='...'
          required={true}
          value={newName}
          maxWidth='lg'
        />

        <TextArea
          id='notes'
          label='Notes'
          setValue={setNewNotes}
          placeholder=''
          required={false}
          value={newNotes}
          rows={2}
        />

        <TextArea
          id='content'
          label='Lyrics'
          setValue={setNewContent}
          placeholder=''
          required={false}
          value={newContent}
          rows={newContent.split('\n').length || 20}
        />

        <Recorder
          songID={id}
        />
      </Form>
    </Container>
  );
};

export default Song;