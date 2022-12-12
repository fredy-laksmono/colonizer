import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
    let authenticatedOptions
    if (user) {
      authenticatedOptions = (
        <nav className="signin-nav">
          <h3>Welcome {user.name}!</h3>
          <button onClick={handleLogOut}>
            Sign Out
          </button>
        </nav>
      )
    }

    const publicOptions = (
      <nav className="nav">
        <Link to="/register" style={{textDecoration: 'none'}}>Register</Link>
        <Link to="/signin" style={{textDecoration: 'none'}}>Sign In</Link>
      </nav>
    )
  
    return (
      <header>
        Colonizer
        {authenticated && user ? authenticatedOptions : publicOptions}
      </header>
    )
  }

  export default Nav