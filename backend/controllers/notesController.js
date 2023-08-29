const User = require('../models/User')
const Transaction = require('../models/Transaction')
const Note = require('../models/Note')

// @desc    Get notes for a transaction
// @route   GET /api/transactions/:transactionId/notes
// @access  Private
const getAllNotes = async (req, res) => {
  const transaction = await Transaction.findById(req.params.transactionId).lean()

  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found'})
  }

  const notes = await Note.find({ transaction: req.params.transactionId }).populate('user', '-password')

  /*if (!notes?.length) {
    return res.status(404).json({ message: 'Notes not found' })
  }*/

  res.status(200).json(notes)
}

// @desc    Create new note for a transaction
// @route   POST /api/transactions/:transactionId/notes
// @access  Private
const createNewNote = async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found'})
  }

  const transaction = await Transaction.findById(req.params.transactionId).lean()

  const note = await Note.create({
    text: req.body.text,
    transaction: req.params.transactionId,
    user: req.user.id,
  })

  if (note) {
    return res.status(201).json(note)
  } else {
    return res.status(400).json({ message: 'Invalid note data received' })
  }
}

// @desc   Delete note
// @route   POST /api/transactions/:transactionId/notes
// @access  Private
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.transactionId)

  if (!note) {
    return res.status(404).json({ message: 'Note not found'})
  }

  await note.remove()

  res.status(200).json(note)
}

module.exports = {
  getAllNotes,
  createNewNote,
  deleteNote
}