const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')

// @desc    Get current user
// @route   GET /users/my-profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}

// @desc    Update profile
// @route   GET /users/my-profile
// @access  Private
const updateProfile = async (req, res) => {
  const { name, email, password, newPassword } = req.body

  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.name = name || user.name
  user.email = email || user.email

  if (password) {
    if (password === newPassword) {
      return res.status(409).json({ message: 'Old password and new password are same. Enter new password'})
    }
    user.password = newPassword
  }

  await user.save()

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  })
}

// @desc    Get all users
// @route   GET /users
// @access  Private
const getAllUsers = async (req, res) => {
  const users = await User.find({ isAdmin: false }).sort({ isAdmin: 'desc' }).select('-password').lean()

  // If no users
  if (!users?.length) {
    return res.status(404).json({ message: 'No users found' })
  }

  res.status(200).json(users)
}

// @desc   Update user
// @route  PATCH /users/:id
// @access  Private
const updateUser = async (req, res) => {
  const { name, email, isAdmin } = req.body

  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.name = name || user.name
  user.email = email || user.email
  user.isAdmin = isAdmin

  const updatedUser = await user.save()

  res.status(200).json(updatedUser)
}

// @desc   Delete user
// @route  DELETE /users/:id
// @access  Private
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id).exec()

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  await user.remove()

  res.status(200).json({ message: 'User deleted' })
}

module.exports = {
  getUserProfile,
  updateProfile,
  getAllUsers,
  updateUser,
  deleteUser,
}