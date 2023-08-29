import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserTransactions } from '../features/transactions/transactionSlice'
import BackButton from '../components/BackButton'
import TransactionItem from '../components/TransactionItem'
import Spinner from '../components/Spinner'

const Transactions = () => {
  const { transactions, totalIncome, totalExpense } = useSelector(
    (state) => state.transactions
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserTransactions())
  }, [dispatch])

  if (!transactions) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <div className='transaction-created transaction-number'>
       <h2> Total Income: ${totalIncome}</h2>
        <h2>Total Expense: ${totalExpense}</h2>
      </div>
      <h1>My Transactions</h1>

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

export default Transactions
