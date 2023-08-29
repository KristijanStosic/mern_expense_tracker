const express = require('express')
const router = express.Router({ mergeParams: true })
const notesController = require('../controllers/notesController')
const { protectedRoute, admin } = require('../middleware/authMiddleware')

router.route('/')
  .get(protectedRoute, notesController.getAllNotes)
  .post(protectedRoute, notesController.createNewNote)
  .delete(protectedRoute, admin, notesController.deleteNote)

module.exports = router