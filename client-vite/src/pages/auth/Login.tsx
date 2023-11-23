import { useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import ServerClient from '../../apis/server';
import Container from '../../components/Container';
import Form from '../../components/Form';
import ButtonSet from '../../components/ButtonSet';
import CancelButton from '../../components/CancelButton';

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Login: React.FC<Props> = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState({ message: '', success: false });
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  if (authenticated) navigate('/songs');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await ServerClient.post('/user/login', {
        username, password
      }, { withCredentials: true });
      setLoading(false);

      if (resp?.status !== 200) setMessage({ message: 'Failed to sign in.', success: false });
      else { setAuthenticated(true); navigate('/songs'); }
    } catch (e: any) {
      setLoading(false);
      if (e?.response?.data?.success === false) {
        setMessage({ success: false, message: e?.response?.data?.message });
      }
    }
  };

  return (
    <Container maxWidth='lg'>
      <Form
        onSubmit={handleSubmit}
        header='Login'
        buttonSet={(
          <ButtonSet>
            <CancelButton
              onClick={() => navigate('/register')}
              text="don't have an account?"
            />
            <Button
              type="submit"
              text="Login"
              disabled={!username || !password || loading}
            />
          </ButtonSet>)
        }
      >
        {
          message?.message && (
            <div>{message?.message}</div>
          )
        }

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
          id='password]'
          label='password'
          type='password'
          setValue={setPassword}
          placeholder=''
          required={true}
          value={password}
        />
      </Form >
    </Container >
  );
};

export default Login;