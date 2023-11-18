import axios from 'axios'

const baseURL = import.meta.env.MODE === 'development' ? '/api' : 'https://serverurl.com'

const ServerClient = axios.create({
  baseURL,
  timeout: 5000,
})

export default ServerClient