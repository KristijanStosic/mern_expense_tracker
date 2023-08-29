import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../features/users/userSlice'
import UserItem from '../components/UserItem'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const Users = () => {
  const { users } = useSelector((state) => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  
  if (!users) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Users</h1>
      <div className='users'>
        <div className='user-headings'>
          <div>Name</div>
          <div>Email</div>
          <div>Admin</div>
          <div>Action</div>
        </div>
        {users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </>
  )
}

export default Users