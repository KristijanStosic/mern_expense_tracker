const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Transaction',
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)