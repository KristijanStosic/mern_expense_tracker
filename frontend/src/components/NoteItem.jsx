import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote } from '../features/notes/noteSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const NoteItem = ({ note }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const openDeleteModal = () => setIsOpenDeleteModal(true)
  const closeDeleteModal = () => setIsOpenDeleteModal(false)

  const onDeleteNote = () => {
    dispatch(deleteNote(note._id))
      .unwrap()
      .then(() => {
        toast.success(`Note is deleted`)
        closeDeleteModal()
      })
      .catch(toast.error)
  }

  return (
    <>
      <div
        className='note'
        style={{
          backgroundColor: '#fff',
          color: '#000',
        }}
      >
        <h4>Note from: {note?.user?.name ? note?.user?.name : user.name}</h4>
        <p>{note.text}</p>
        <div className='note-date'>
          {new Date(note.createdAt).toLocaleString('en-DE')}{' '}
          {user.isAdmin && (
            <FaTrashAlt
              onClick={openDeleteModal}
              color='crimson'
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpenDeleteModal}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel='Delete Note'
      >
        <h2>Delete Note #{note?._id}?</h2>
        <button className='btn-close' onClick={closeDeleteModal}>
          X
        </button>
        <div className='btn-group-actions'>
          <button className='btn' onClick={onDeleteNote}>
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

export default NoteItem