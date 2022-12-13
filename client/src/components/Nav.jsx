import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
    let authenticatedOptions
    if (user) {
      authenticatedOptions = (
        <nav className="signin-nav">
          <div></div>
          <div className='signin-nav-menu'>
            <div></div>
            <div className='click-able'>Play</div>
            <div className='click-able'>Race</div>
            <div></div>
          </div>
          <div className='signin-nav-profile'>
            <button onClick={handleLogOut}>
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
        Colonizer
        {authenticated && user ? authenticatedOptions : publicOptions}
      </header>
    )
  }

  export default Nav