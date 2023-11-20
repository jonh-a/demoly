import { useEffect } from 'react';
import Container from '../../components/Container'
import { useNavigate } from 'react-router-dom'

interface Props {
    authenticated: boolean;
}

const Home: React.FC<Props> = ({
    authenticated,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) navigate('/songs')
    if (!authenticated) navigate('/auth')
  }, [])

  return (
    <Container>
      
    </Container>
  )
}

export default Home