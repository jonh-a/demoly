import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <div>
        <h1>Demoly</h1>
      </div>

      <div>
        <Link to="/songs">Songs</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  )
}

export default Navbar