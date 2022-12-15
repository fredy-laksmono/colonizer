import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
    let authenticatedOptions
    if (user) {
      authenticatedOptions = (
        <nav className="signin-nav">
          <div></div>
          <div className='signin-nav-menu'>
            <div></div>
            <Link to="/home" style={{textDecoration: 'none'}}>Play</Link>
            <Link to="/races" style={{textDecoration: 'none'}}>Race</Link>
            <div></div>
          </div>
          <div className='signin-nav-profile'>
            <button className='border-radius-20' onClick={handleLogOut}>
              Log Out
            </button>
            <div>{user.name}</div>
          </div>
          
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
        Battleship Chaos
        {authenticated && user ? authenticatedOptions : publicOptions}
      </header>
    )
  }

  export default Nav