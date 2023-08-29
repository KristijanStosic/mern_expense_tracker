import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaPencilAlt, FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTransaction,deleteTransaction } from '../features/transactions/transactionSlice'
import { getAllNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'

const Transaction = () => {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { transaction } = useSelector((state) => state.transactions)
  const { notes } = useSelector((state) => state.notes)

  const [noteText, setNoteText] = useState('')

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  useEffect(() => {
    dispatch(getTransaction(transactionId)).unwrap().catch(toast.error)
    dispatch(getAllNotes(transactionId)).unwrap().catch(toast.error)
  }, [transactionId, dispatch])


  // Delete transaction
  const onTransactionDelete = () => {
    dispatch(deleteTransaction(transactionId))
      .unwrap()
      .then(() => {
        toast.success('Transaction deleted')
        navigate('/')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    if (!noteText) return toast.error('Please add some text')
    dispatch(createNote({ noteText, transactionId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        toast.success(`Note Created for transaction`)
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const openDeleteModal = () => setIsOpenDeleteModal(true)
  const closeDeleteModal = () => setIsOpenDeleteModal(false)

  if (!transaction) {
    return <Spinner />
  }

  return (
    <div className='transaction-page'>
      <header className='transaction-header'>
        <BackButton />
        <h2>
          Transaction ID: {transaction._id}
          <span className={`level level-${transaction.level}`}>
            {transaction.level}
          </span>
          <span className={`type type-${transaction.type}`}>
            {transaction.type}
          </span>
        </h2>
        <h3>Title: {transaction.title}</h3>
        <h3>
          Date Submitted:{' '}
          {new Date(transaction.transactionDate).toLocaleString('en-DE')}
        </h3>
        <h3>Category: {transaction.category}</h3>
        <h3>Amount: ${transaction.amount}</h3>
        <hr />
        <div className='transaction-desc'>
          <h3>Description of Transaction</h3>
          <p>{transaction.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      <button onClick={openModal} className='btn btn-svg'>
        <FaPlus /> Add Note
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenDeleteModal}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel='Delete Transaction'
      >
        <h2>Delete Transaction #{transaction._id}</h2>
        <button className='btn-close' onClick={closeDeleteModal}>
          X
        </button>
        <div className='btn-group-actions'>
          <button className='btn' onClick={onTransactionDelete}>
            Yes
          </button>
          <button className='btn' onClick={closeDeleteModal}>
            No
          </button>
        </div>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <h3>No notes for this transaction!</h3>
      )}

      {user && user.isAdmin && (
        <button onClick={openDeleteModal} className='btn btn-block btn-svg'>
          <FaPencilAlt /> Delete Transaction
        </button>
      )}
    </div>
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

export default Transaction