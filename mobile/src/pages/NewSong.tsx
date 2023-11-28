import { useState, SyntheticEvent } from 'react';
import { IonButton, useIonRouter } from '@ionic/react';
import ServerClient from '../apis/server';
import TextField from '../components/TextField';
// import Toast from '../components/Toast';
// import { ToastData } from '../definitions';
import PageWrapper from '../components/PageWrapper';

interface Props {
  authenticated: boolean | null
  setAuthenticated: (authenticated: boolean) => void;
}

const NewSong: React.FC<Props> = (
  {
    authenticated,
    setAuthenticated
  }
) => {
  const [name, setName] = useState<string>('');
  const [_, setMessage] = useState({ message: '', success: true });
  const router = useIonRouter()

  if (authenticated === false) router.push('/login');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resp = await ServerClient.post('/song/new', {
        name
      }, { withCredentials: true });

      if (resp?.status === 403) setAuthenticated(false); router.push('/');
      if (resp?.status !== 200) setMessage({ message: 'Failed to create song.', success: false });
      else if (resp?.data?.id) { router.push(`/song/${resp?.data?.id}`); }
    } catch (e: any) {
      if (e?.response?.data?.success === false) {
        setMessage({ success: false, message: e?.response?.data?.message });
      }
    }
  };

  return (
    <PageWrapper name='New Song'>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Title'
          type='text'
          setValue={setName}
          placeholder='My Super Creative Song Title'
          required={true}
          value={name}
        />

        <IonButton
          type='submit'
        >
          Save
        </IonButton>

        <IonButton
          type='button'
          routerLink='/songs'
        >
          Cancel
        </IonButton>

      </form>
    </PageWrapper>
  );
};

export default NewSong;