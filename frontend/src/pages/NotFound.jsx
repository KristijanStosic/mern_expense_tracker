import { FaExclamationCircle, FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='error'>
      <h1>
        <FaExclamationCircle />
      </h1>
      <h1>404 - Page Not Found!</h1>
      <Link to='/' className='btn'>
        <FaArrowAltCircleLeft /> Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
