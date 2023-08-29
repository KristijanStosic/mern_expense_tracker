const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')
const { checkPasswordValidity } = require('../utils/validatePassword')

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please include name, email and password' })
  }

  /*let passwordMessage = checkPasswordValidity(password)

  if (passwordMessage) {
    return res.status(400).json({ message: passwordMessage })
  }*/

  // Find if user already exists
  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'User already exists with this email' })
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    })
  } else {
    return res.status(400).json({ message: 'Invalid user data' })
  }
}

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).exec()

  if (!user) {
    return res.status(404).json({ message: 'User with this email or password does not exist' })
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Incorrect password' })
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    isAdmin: user.isAdmin,
  })
}

module.exports = {
  register,
  login
}
