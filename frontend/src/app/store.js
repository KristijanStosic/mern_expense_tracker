import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import transactionReducer from '../features/transactions/transactionSlice'
import noteReducer from '../features/notes/noteSlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    notes: noteReducer,
    users: userReducer
  }
})
