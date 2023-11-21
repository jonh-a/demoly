import { useState, SyntheticEvent } from "react"
import ServerClient from "../../apis/server"
import FormHeader from "../../components/FormHeader"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import Container from "../../components/Container"
import { Link } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({ message: '', success: false })

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
    <Container>
      <form onSubmit={handleSubmit}>
        <FormHeader>
          Register
        </FormHeader>

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

        <Button
          type="submit"
          text="Register"
        />

        <div>
          <p><Link to="/login">have an existing account?</Link></p>
        </div>

      </form>
    </Container>
  )
}

export default Register