import { useState, SyntheticEvent } from "react";
import PageWrapper from "../components/PageWrapper";
import TextField from "../components/TextField";
import { IonButton, IonItem, IonRouterLink } from "@ionic/react";
import ServerClient from "../apis/server";
import { useIonRouter } from "@ionic/react";

interface Props {
  authenticated: boolean | null;
  setAuthenticated: (authenticated: boolean) => void
}

interface Toast {
  message: string;
  type: string;
}

const Login: React.FC<Props> = ({
  authenticated,
  setAuthenticated
}) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  // const [toast, setToast] = useState<Toast> = useState({ message: '', type: '' })

  const router = useIonRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const resp = await ServerClient.post('/user/login', {
        username, password
      }, { withCredentials: true });
      setLoading(false);

      if (resp?.status !== 200) {
        /* setToast({
          message: resp?.data?.message || 'Failed to sign in.',
          type: 'error'
        }); */
        console.log('failed')
        setToastOpen(true);
      }
      else {
        console.log('success!')
        setAuthenticated(true);
        router.push('/songs', 'forward', 'push');
      }
    } catch (e: any) {
      setLoading(false);
      if (e?.response?.data?.success === false) {
        /*setToast({
          message: e?.response?.data?.message || 'Failed to sign in.',
          type: 'error'
        });*/
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
      </div>
    </PageWrapper >
  )
}

export default Login