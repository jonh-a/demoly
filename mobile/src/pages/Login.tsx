import { useState, useEffect, SyntheticEvent } from "react";
import PageWrapper from "../components/PageWrapper";
import TextField from "../components/TextField";
import { IonButton, IonItem, IonRouterLink } from "@ionic/react";
import ServerClient from "../apis/server";
import Toast from "../components/Toast";
import { useIonRouter } from "@ionic/react";

interface Props {
  authenticated: boolean | null;
  setAuthenticated: (authenticated: boolean) => void
}

export interface ToastData {
  type: 'success' | 'warning' | 'error'
  message: string
}

const Login: React.FC<Props> = ({
  authenticated,
  setAuthenticated
}) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastData>({ type: 'success', message: '' });

  const router = useIonRouter()

  useEffect(() => {
    if (authenticated) {
      console.log('redirecting to songs');
      router.push('/songs')
    }
  }, [authenticated]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resp = await ServerClient.post('/user/login', {
        username, password
      }, { withCredentials: true });
      setLoading(false);

      if (resp?.status !== 200) {
        setToast({
          message: resp?.data?.message || 'Failed to sign in.',
          type: 'error'
        });
        setToastOpen(true);
      } else {
        setAuthenticated(true);
        router.push('/songs', 'root', 'replace');
      }
    } catch (e: any) {
      setLoading(false);
      if (e?.response?.data?.success === false) {
        setToast({
          message: e?.response?.data?.message || 'Failed to sign in.',
          type: 'error'
        });
        setToastOpen(true);
      }
    }
  };

  return (
    <PageWrapper name='Login'>
      <div>
        <TextField
          value={username}
          setValue={setUsername}
          label='Username'
          type='text'
        />

        <TextField
          value={password}
          setValue={setPassword}
          label='Password'
          type='password'
        />

        <div className='ion-padding-top'>
          <IonButton routerLink='register'>
            Existing account?
          </IonButton>

          <IonButton onClick={handleSubmit}>
            Login
          </IonButton>
        </div>

        <Toast
          toastOpen={toastOpen}
          toast={toast}
          setToastOpen={() => setToastOpen(false)}
        />
      </div>
    </PageWrapper >
  )
}

export default Login