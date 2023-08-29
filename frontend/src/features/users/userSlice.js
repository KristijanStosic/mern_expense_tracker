import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../utils'
import userService from './userService'

const initialState = {
  users: null,
  user: null,
}

// Get all users
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.getAllUsers(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.deleteUser(userId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Update user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ name, email, isAdmin, userId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.updateUser(name, email, isAdmin, userId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.user = null
        state.users = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(updateUser.pending, (state, action) => {
        state.user = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        )
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        )
      })
  },
})

export default userSlice.reducer
