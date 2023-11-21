import { useState, SyntheticEvent } from "react"
import ServerClient from "../../apis/server"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import Container from "../../components/Container"
import { useNavigate } from "react-router-dom"
import ButtonSet from "../../components/ButtonSet"
import Form from "../../components/Form"
import CancelButton from '../../components/CancelButton'

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState({ message: '', success: false })
  const navigate = useNavigate()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      await ServerClient.post('/user/register', {
        username, password
      })
    } catch (e: any) {
      if (e?.response?.data?.success === false) {
        setMessage({ success: false, message: e?.response?.data?.message })
      }
    }
  }

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
              text="Login"
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
          id='password'
          label='password'
          type='password'
          setValue={setPassword}
          placeholder=''
          required={true}
          value={password}
        />

        <TextField
          id='confirmPassword'
          label='confirm password'
          type='confirm password'
          setValue={setConfirmPassword}
          placeholder=''
          required={true}
          value={confirmPassword}
        />

      </Form>
    </Container>
  )
}

export default Register