import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaUserAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfile } from '../features/auth/authSlice'
import BackButton from '../components/BackButton'

const MyProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
  }, [user?.name, user?.email])

  const onNameChanged = (e) => setName(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onNewPasswordChanged = (e) => setNewPassword(e.target.value)
  const onConfirmNewPasswordChanged = (e) => setConfirmNewPassword(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      newPassword
    }

    if (newPassword !== confirmNewPassword) return toast.error('New password and confirm new password do not match')

    dispatch(updateUserProfile(userData))
      .unwrap()
      .then((user) => {
        toast.success(`User - ${user.name} updated`)
      })
      .then(() => {
        setPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      })
      .catch(toast.error)
  }

  return (
    <>
      <section className='heading'>
        <BackButton />
        <h1>
          <FaUserAlt /> MY PROFILE
        </h1>
        <p>Please fill in the form to update profile</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onNameChanged}
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onEmailChanged}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Old Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onPasswordChanged}
              placeholder='Enter your old password'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='newPassword'>New Password</label>
            <input
              type='password'
              className='form-control'
              id='newPassword'
              name='newPassword'
              value={newPassword}
              onChange={onNewPasswordChanged}
              placeholder='Enter your new password'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmNewPassword'>Confirm New Password</label>
            <input
              type='password'
              className='form-control'
              id='confirmNewPassword'
              name='confirmNewPassword'
              value={confirmNewPassword}
              onChange={onConfirmNewPasswordChanged}
              placeholder='Enter your confirm new password'
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>UPDATE</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default MyProfile
