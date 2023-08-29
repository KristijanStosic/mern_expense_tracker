import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaEye, FaPencilAlt } from 'react-icons/fa'
import { updateTransaction } from '../features/transactions/transactionSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch()
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

  const [category, setCategory] = useState(transaction?.category)
  const [description, setDescription] = useState(transaction?.description)
  const [level, setLevel] = useState(transaction?.level)
  const [amount, setAmount] = useState(transaction?.amount || '')
  const [type, setType] = useState(transaction?.type)
  const [title, setTitle] = useState(transaction?.title)

  const onCategoryChanged = (e) => setCategory(e.target.value)
  const onDescriptionChanged = (e) => setDescription(e.target.value)
  const onLevelChanged = (e) => setLevel(e.target.value)
  const onAmountChanged = (e) => setAmount(e.target.value)
  const onTypeChanged = (e) => setType(e.target.value)
  const onTitleChanged = (e) => setTitle(e.target.value)

  const openUpdateModal = () => setIsOpenUpdateModal(true)
  const closeUpdateModal = () => setIsOpenUpdateModal(false)

  const transactionId = transaction?._id

  // Update transaction
  const onTransactionUpdate = (e) => {
    e.preventDefault()

    const transactionData = {
      title,
      description,
      amount,
      level,
      type,
      category,
    }

    dispatch(updateTransaction({ transactionData, transactionId }))
      .unwrap()
      .then(() => {
        toast.success('Transaction Updated')
        closeUpdateModal()
      })
      .catch(toast.error)
  }

  return (
    <>
      <div className='transaction'>
        <div>{transaction.title}</div>
        <div>${transaction.amount}</div>
        <div className={`type type-${transaction.type}`}>
          {transaction.type}
        </div>
        <div>
          {new Date(transaction.transactionDate).toLocaleString('en-DE')}
        </div>
        <div>{transaction.category}</div>
        <div className={`level level-${transaction.level}`}>
          {transaction.level}
        </div>
        <div className='btn-group-actions'>
          <Link
            to={`/transaction/${transaction._id}`}
            className='btn btn-reverse btn-sm'
          >
            <FaEye />
          </Link>
          <button className='btn btn-reverse btn-sm' onClick={openUpdateModal}><FaPencilAlt /></button>
        </div>
      </div>

      <Modal
        isOpen={isOpenUpdateModal}
        onRequestClose={closeUpdateModal}
        style={customStyles}
        contentLabel='Update Transaction'
      >
        <h2>Update Transaction #{transaction._id}</h2>
        <button className='btn-close' onClick={closeUpdateModal}>
          X
        </button>
        <form onSubmit={onTransactionUpdate}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              className='form-control'
              placeholder='Title'
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={onDescriptionChanged}
            ></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              name='amount'
              id='amount'
              className='form-control'
              placeholder='Amount'
              value={amount}
              onChange={onAmountChanged}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>Type</label>
            <select name='type' id='type' value={type} onChange={onTypeChanged}>
              <option value='income'>income</option>
              <option value='expense'>expense</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select
              name='category'
              id='category'
              value={category}
              onChange={onCategoryChanged}
            >
              <option value='Food'>Food</option>
              <option value='Salary'>Salary</option>
              <option value='Freelance'>Freelance</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Investment'>Investment</option>
              <option value='Travel'>Travel</option>
              <option value='Education'>Education</option>
              <option value='Medical'>Medical</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='level'>Level</label>
            <select
              name='level'
              id='level'
              value={level}
              onChange={onLevelChanged}
            >
              <option value='low'>low</option>
              <option value='medium'>medium</option>
              <option value='high'>high</option>
            </select>
          </div>
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
    </>
  )
}

const customStyles = {
  content: {
    backgroundColor: '#000',
    width: '600px',
    height: '500px',
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

export default TransactionItem
