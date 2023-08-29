import { FaCheck, FaPencilAlt, FaTimes, FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, getAllUsers, updateUser } from '../features/users/userSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const UserItem = ({ user }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false)

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  // Open/close modals
  const openUpdateModal = () => setIsOpenUpdateModal(true)
  const openDeleteModal = () => setIsOpenDeleteModal(true)
  const closeUpdateModal = () => setIsOpenUpdateModal(false)
  const closeDeleteModal = () => setIsOpenDeleteModal(false)

  const userId = user?._id

  const onUserUpdateSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUser({ name, email, isAdmin, userId }))
      .unwrap()
      .then(() => {
        toast.success(`User - ${user?.name} updated`)
        closeUpdateModal()
      })
      .catch(toast.error)
  }

  const onDeleteUser = () => {
    dispatch(deleteUser(user._id))
      .unwrap()
      .then(() => {
        toast.success(`User ${user?.name} is deleted`)
        closeDeleteModal()
      })
      .then(() => {
        dispatch(getAllUsers())
      })
      .catch(toast.error)
  }

  return (
    <>
      <div className='user'>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>
          {user.isAdmin ? <FaCheck color='green' /> : <FaTimes color='red' />}
        </div>
        <div className='btn-group-actions'>
          <button className='btn btn-reverse btn-sm' onClick={openUpdateModal}>
            <FaPencilAlt />
          </button>
          <button className='btn btn-reverse btn-sm' onClick={openDeleteModal}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpenUpdateModal}
        onRequestClose={closeUpdateModal}
        style={customStyles}
        contentLabel='Update User'
      >
        <h2>Update User {user?.name}?</h2>
        <button className='btn-close' onClick={closeUpdateModal}>
          X
        </button>
        <form onSubmit={onUserUpdateSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              id='name'
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              id='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor='isAdmin' style={{ color: '#fff'}}>Admin?</label>
          <input
            style={{ cursor: 'pointer', marginLeft: '5px' }}
            name='isAdmin'
            id='isAdmin'
            type='checkbox'
            className='form-control'
            checked={isAdmin}
            value={isAdmin}
            onChange={(e) => setIsAdmin(!isAdmin)}
          />
          <div className='btn-group-actions'>
            <button className='btn' type='submit'>
              Submit
            </button>
            <button className='btn' onClick={closeUpdateModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isOpenDeleteModal}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel='Delete User'
      >
        <h2>Delete User {user?.name}?</h2>
        <button className='btn-close' onClick={closeDeleteModal}>
          X
        </button>
        <div className='btn-group-actions'>
          <button className='btn' onClick={onDeleteUser}>
            Yes
          </button>
          <button className='btn' onClick={closeDeleteModal}>
            No
          </button>
        </div>
      </Modal>
    </>
  )
}

const customStyles = {
  content: {
    backgroundColor: '#000',
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

export default UserItem
