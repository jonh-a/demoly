import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ServerClient from '../../apis/server';
import { useNavigate } from 'react-router-dom';

interface Props {
  setAuthenticated: (authenticated: boolean) => void;
}

const Logout: React.FC<Props> = ({ setAuthenticated }) => {
  const [_, __, removeCookie] = useCookies(['access_token']);

  const navigate = useNavigate();

  const sendLogout = async () => {
    try {
      const resp = await ServerClient.get('/user/logout', { withCredentials: true });
      if (resp.status === 200) {
        setAuthenticated(false);
        navigate('/');
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    sendLogout();
    removeCookie('access_token', { path: '/', domain: 'localhost' });
  }, []);

  return (
    <div>Logout</div>
  );
};

export default Logout;