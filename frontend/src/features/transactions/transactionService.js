import axios from 'axios'

// Create new transaction
const createTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post('/transactions', transactionData, config)

  return response.data
}

// Get all transactions
const getAllTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get('/transactions/all-transactions', config)

  return response.data
}

// Get user transactions
const getUserTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get('/transactions', config)

  return response.data
}

// Get user transaction
const getTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`/transactions/${transactionId}`, config)

  return response.data
}

const updateTransaction = async (transactionData, transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(`/transactions/${transactionId}`, transactionData, config)

  return response.data
}

// Delete transaction
const deleteTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`/transactions/${transactionId}`, config)

  return response.data
}

const transactionService = {
  getAllTransactions,
  createTransaction,
  getUserTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
}

export default transactionService
