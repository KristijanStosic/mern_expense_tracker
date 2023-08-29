import axios from 'axios'

// Register user
const register = async (userData) => {
  const response = await axios.post('/auth/register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post('/auth/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('profile')
}

const updateUserProfile = async(name, email, password, newPassword, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(`/users/my-profile`,{ name, email, password, newPassword }, config)

  if (response.data) {
    localStorage.setItem('profile', JSON.stringify(response.data))
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const authService = {
  register,
  login,
  logout,
  updateUserProfile
}

export default authService
