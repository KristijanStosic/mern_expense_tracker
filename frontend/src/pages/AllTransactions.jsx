import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTransactions } from '../features/transactions/transactionSlice'
import BackButton from '../components/BackButton'
import TransactionItem from '../components/TransactionItem'
import Spinner from '../components/Spinner'

const AllTransactions = () => {
  const { transactions } = useSelector((state) => state.transactions)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTransactions())
  }, [dispatch])

  if (!transactions) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>All Transactions</h1>
      <div className='transactions'>
        <div className='transaction-headings'>
          <div>Title</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Transaction Date</div>
          <div>Category</div>
          <div>Level</div>
          <div>Actions</div>
        </div>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} />
        ))}
      </div>
    </>
  )
}

export default AllTransactions
