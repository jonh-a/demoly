import { useState, SyntheticEvent, useEffect } from 'react';
import ServerClient from '../../apis/server';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import ButtonSet from '../../components/ButtonSet';
import Form from '../../components/Form';
import CancelButton from '../../components/CancelButton';
import Toast from '../../components/Toast';
import { ToastData } from '../../definitions';

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Register: React.FC<Props> = ({
  authenticated,
  setAuthenticated,
}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordGoodEnough, setPasswordGoodEnough] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastData>({ type: 'success', message: '' });
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  if (authenticated) navigate('/songs');

  useEffect(() => {
    if (password === confirmPassword) setPasswordsMatch(true);
    else setPasswordsMatch(false);

    if (password.length >= 8) setPasswordGoodEnough(true);
    else setPasswordGoodEnough(false);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!passwordGoodEnough || !passwordsMatch) return;
    setLoading(true);
    try {
      const resp = await ServerClient.post('/user/register', {
        username, password, email
      }, {
        withCredentials: true
      });
      setLoading(false);

      if (resp.data?.success) {
        setAuthenticated(true);
        navigate('/songs');
      } else if (resp?.status === 400) {
        setToast({
          message: resp?.data?.message || 'Failed to register.',
          type: 'error'
        });
        setToastOpen(true);
      } else {
        setToast({
          message: 'An unexpected error occurred when registering.',
          type: 'error'
        });
        setToastOpen(true);
      }
    } catch (e: any) {
      setLoading(false);
      setToast({
        message: e?.response?.data?.message || 'An unexpected error occurred when registering.',
        type: 'error'
      });
      setToastOpen(true);
    }
  };

  return (
    <Container maxWidth='lg'>
      {toastOpen && (
        <Toast
          type={toast.type}
          header=''
          text={toast.message}
          open={toastOpen}
          setOpen={setToastOpen}
        />
      )}
      <Form
        onSubmit={handleSubmit}
        header='Register'
        buttonSet={(
          <ButtonSet>
            <CancelButton
              text="have an existing account?"
              onClick={() => navigate('/login')}
            />
            <Button
              type="submit"
              text="Register"
              disabled={!passwordGoodEnough || !passwordsMatch || !username || loading}
            />
          </ButtonSet>)
        }
      >
        <TextField
          id='username'
          label='username'
          type='text'
          setValue={setUsername}
          placeholder='himynameis'
          required={true}
          value={username}
        />

        <TextField
          id='email'
          label='email'
          type='email'
          setValue={setEmail}
          placeholder='myemail@example.com'
          required={true}
          value={email}
        />

        <TextField
          id='password'
          label='password'
          type='password'
          setValue={setPassword}
          placeholder=''
          required={true}
          value={password}
          errorText='Must contain at least 8 characters'
          error={!passwordGoodEnough}
        />

        <TextField
          id='confirmPassword'
          label='confirm password'
          type='password'
          setValue={setConfirmPassword}
          placeholder=''
          required={true}
          value={confirmPassword}
          errorText='Passwords must match'
          error={!passwordsMatch}
        />
      </Form>
    </Container>
  );
};

export default Register;