import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    toast.success('Successfully logged out!')
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <ul>
          {user ? (
            <>
              <p>Hello, {user.name}</p>
              <li>
                <button className='btn btn-svg' onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to='/register'>
                    <FaUser />
                    Register
                  </Link>
                </li>
              </ul>
            </>
          )}
        </ul>
      </div>
      <div className='header-logo'>
        <Link to='/'>Expense Tracker</Link>
      </div>
    </header>
  )
}

export default Header
