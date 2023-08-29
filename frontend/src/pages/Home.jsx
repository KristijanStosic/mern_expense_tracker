import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaMoneyBillWaveAlt, FaMoneyBillAlt, FaUserAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <section className='heading'>
        <h1>Expense Tracker App</h1>
        <p>Please choose from an option below</p>
      </section>

      {!user?.isAdmin && (
        <>
          <Link to='/create-transaction' className='btn btn-block btn-svg'>
            <FaQuestionCircle /> Create New Transaction
          </Link>

          <Link to='/transactions' className='btn btn-block btn-svg'>
            <FaMoneyBillAlt /> View My Transactions
          </Link>
        </>
      )}

      <Link to='/my-profile' className='btn btn-block btn-svg'>
        <FaUserAlt /> My Profile
      </Link>

      {user && user.isAdmin && (
        <>
          <Link to='/all-transactions' className='btn btn-block btn-svg'>
            <FaMoneyBillWaveAlt /> View All Transactions
          </Link>

          <Link to='/all-users' className='btn btn-block btn-svg'>
            <FaUserAlt /> View All Users
          </Link>
        </>
      )}
    </>
  )
}

export default Home
