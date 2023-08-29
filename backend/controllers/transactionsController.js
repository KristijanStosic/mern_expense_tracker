const User = require('../models/User')
const Transaction = require('../models/Transaction')

// @desc    Get all transactions
// @route   GET /all-transactions
// @access  Private
const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find({}).populate('user', '-password').lean()

  // If no transactions
  if (!transactions?.length) {
    return res.status(404).json({ message: 'No transactions found' })
  }

  res.status(200).json(transactions)
}

// @desc    Get user transactions
// @route   GET /transactions
// @access  Private
const getUserTransactions = async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const transactions = await Transaction.find({ user: req.user.id }).populate('user', '-password').lean()

  // If no transactions
  if (!transactions?.length) {
    return res.status(404).json({ message: 'No transactions found' })
  }

  let totalIncome = 0
  let totalExpense = 0

  transactions.forEach((transaction) => {
    switch (transaction.type) {
      case 'income':
        totalIncome = totalIncome + transaction.amount
        break;
      case 'expense':
        totalExpense = totalExpense + transaction.amount
      default:
        break;
    }
  })

  res.status(200).json({ transactions, totalIncome, totalExpense })
}

// @desc   Create new transaction
// @route  POST /transactions
// @access  Private
const createNewTransaction = async (req, res) => {
  const { amount, description, category, title, type } = req.body

  if (!description || !amount || !category || !title || !type) {
    return res.status(404).json({ message: 'Please add description, amount, title, type and category' })
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Create and store the new user
  const transaction = await Transaction.create({
    amount,
    description,
    category,
    title,
    type,
    user: req.user.id,
  })

  if (transaction) {
    return res.status(201).json(transaction)
  } else {
    return res.status(400).json({ message: 'Invalid transaction data received' })
  }
}

// @desc   Get single transaction
// @route  GET /transactions/:id
// @access  Private
const getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id).populate('user', '-password').lean().exec()

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' })
  }

  res.status(200).json(transaction)
}

// @desc   Update transaction
// @route  PATCH /transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  const { title, level, amount, transactionDate, description, category, type } = req.body

  const transaction = await Transaction.findById(req.params.id).exec()

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' })
  }

  transaction.level = level || transaction.level
  transaction.transactionDate = transactionDate || transaction.transactionDate
  transaction.amount = amount || transaction.amount
  transaction.description = description || transaction.description
  transaction.category = category || transaction.category
  transaction.title = title || transaction.title
  transaction.type = type || transaction.type

  await transaction.save()

  res.status(200).json(transaction)
}

// @desc   Delete transaction
// @route  DELETE /transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id).exec()

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' })
  }

  await transaction.remove()

  res.status(200).json({ message: 'Transaction deleted' })
}

module.exports = {
  getAllTransactions,
  getUserTransactions,
  createNewTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
}