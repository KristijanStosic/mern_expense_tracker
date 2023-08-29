const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Please login to access this route' })
  }

  let token
  token = authHeader.split(' ')[1]

  if (token) {
    try {
      // Get token from header
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
      // Get user from token
      req.user = await User.findById(decoded.userId).select('-password')
  
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' })
      }
  
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Not authorized' })
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token'})
  }
}

const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(403).json({ message: 'Not Authorized as an Admin'})
  }
}

module.exports = { protectedRoute, admin }