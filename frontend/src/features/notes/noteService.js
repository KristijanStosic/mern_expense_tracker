import axios from 'axios'

// Get transaction notes
const getAllNotes = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`/transactions/${transactionId}/notes`, config)

  return response.data
}

// Create transaction note
const createNote = async (noteText, transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    `/transactions/${transactionId}/notes`,
    { text: noteText },
    config
  )

  return response.data
}

// Delete note for transaction
const deleteNote = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`/transactions/${transactionId}/notes`, config)

  return response.data
}

const noteService = {
  getAllNotes,
  createNote,
  deleteNote
}

export default noteService