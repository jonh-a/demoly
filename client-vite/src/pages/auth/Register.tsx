import { useState, SyntheticEvent, useEffect } from 'react';
import ServerClient from '../../apis/server';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import ButtonSet from '../../components/ButtonSet';
import Form from '../../components/Form';
import CancelButton from '../../components/CancelButton';

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
  const [message, setMessage] = useState({ message: '', success: false });
  const [passwordGoodEnough, setPasswordGoodEnough] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

      if (resp.data?.success) { setAuthenticated(true); navigate('/songs'); }
      else if (!resp?.data?.success && resp?.data.message) setMessage(resp.data);
      else setMessage({ success: false, message: 'An unexpected error occurred.' });
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