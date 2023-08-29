import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTransaction } from '../features/transactions/transactionSlice'
import BackButton from '../components/BackButton'

const NewTransaction = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [category, setCategory] = useState('Food')
  const [type, setType] = useState('expense')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const onCategoryChanged = (e) => setCategory(e.target.value)
  const onDescriptionChanged = (e) => setDescription(e.target.value)
  const onAmountChanged = (e) => setAmount(e.target.value)
  const onTypeChanged = (e) => setType(e.target.value)
  const onTitleChanged = (e) => setTitle(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTransaction({ category, description, amount, type, title }))
      .unwrap()
      .then(() => {
        navigate('/transactions')
        toast.success('New transaction created!')
      })
      .catch(toast.error)
  }

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h1>Create New Transaction</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <label htmlFor='description'>Description of the transaction</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={onDescriptionChanged}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>SUBMIT</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTransaction
