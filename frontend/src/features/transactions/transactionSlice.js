import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../utils'
import transactionService from './transactionService'

const initialState = {
  transactions: null,
  transaction: null,
  totalIncome: 0,
  totalExpense: 0
}

// Create new transaction
export const createTransaction = createAsyncThunk(
  'transactions/create',
  async (transactionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.createTransaction(transactionData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user transactions
export const getUserTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.getUserTransactions(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get all transactions
export const getAllTransactions = createAsyncThunk(
  'transactions/getAllTransactions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.getAllTransactions(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user transaction
export const getTransaction = createAsyncThunk(
  'transactions/getSingleTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.getTransaction(transactionId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Delete transaction
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.deleteTransaction(transactionId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Update transaction
export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ transactionData, transactionId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transactionService.updateTransaction(transactionData, transactionId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserTransactions.pending, (state) => {
        state.transaction = null
        state.transactions = null
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.transactions 
        state.totalExpense = action.payload.totalExpense 
        state.totalIncome = action.payload.totalIncome
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.transaction = null
        state.transactions = null
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.transaction = action.payload
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.transaction = action.payload
        state.transactions = state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        )
      })
  },
})

export default transactionSlice.reducer