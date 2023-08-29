import axios from 'axios'

// Get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get('/users', config)

  return response.data
}

const updateUser = async (name, email, isAdmin, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(`/users/${userId}`,{ name, email, isAdmin }, config)

  return response.data
}

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`/users/${userId}`, config)

  return response.data
}

const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
}

export default userService
