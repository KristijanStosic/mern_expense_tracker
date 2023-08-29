const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please enter title of transaction'],
    },
    amount: {
      type: Number,
      required: [true, 'Please enter amount of transaction'],
    },
    type: {
      type: String,
      required: [true, 'Please select a type'],
      enum: ['expense', 'income'],
    },
    transactionDate: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      required: [true, 'Please enter description of transaction'],
    },
    category: {
      type: String,
      required: [true, 'Please select category of transaction'],
      enum: [
        'Salary',
        'Freelance',
        'Food',
        'Entertainment',
        'Investment',
        'Travel',
        'Education',
        'Medical',
      ],
    },
    level: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
)

// when deleting transaction, remove all notes associated with that user
transactionSchema.pre('remove', async function (next) {
  await this.model('Note').deleteMany({ transaction: this._id })
})

module.exports = mongoose.model('Transaction', transactionSchema)