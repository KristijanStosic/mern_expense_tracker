import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'
import { extractErrorMessage } from '../utils'

const initialState = {
  notes: null,
}

// Get transaction notes
export const getAllNotes = createAsyncThunk(
  'notes/getAllNotes',
  async (transactionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getAllNotes(transactionId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Create transaction note
export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ noteText, transactionId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, transactionId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Delete transaction note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (transactionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.deleteNote(transactionId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.notes = null
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.notes = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => action.payload._id !== note._id)
      })
  },
})

export default noteSlice.reducer
