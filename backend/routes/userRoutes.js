const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const { protectedRoute } = require('../middleware/authMiddleware')

router.route('/').get(protectedRoute, usersController.getAllUsers)
router.route('/my-profile').get(protectedRoute, usersController.getUserProfile)
router.route('/my-profile').patch(protectedRoute, usersController.updateProfile)
router.route('/:id').patch(protectedRoute, usersController.updateUser)
router.route('/:id').delete(protectedRoute, usersController.deleteUser)

module.exports = router