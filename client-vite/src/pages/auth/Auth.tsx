import { useState, SyntheticEvent } from 'react'
import ServerClient from '../../apis/server';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Container from '../../components/Container';
import FormHeader from '../../components/FormHeader';
import Login from './Login';
import Register from './Register';

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Auth: React.FC<Props> = ({ authenticated, setAuthenticated }) => {
  return (
    <Container>
      <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Register />
    </Container>
  )
}

export default Auth