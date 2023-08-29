require('dotenv').config()
const connectDB = require('./config/db')
const users = require('./data/users')
const notes = require('./data/notes')
const transactions = require('./data/transactions')
const User = require('./models/User')
const Transaction = require('./models/Transaction')
const Note = require('./models/Note')

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Transaction.deleteMany()
    await Note.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleTransactions = transactions.map((transaction) => {
      return { ...transaction, user: adminUser }
    })

    const createdTransactions = await Transaction.insertMany(sampleTransactions)
    const transaction = createdTransactions[0]._id

    const sampleNotes = notes.map((note) => {
      return { ...note, transaction: transaction, user: adminUser }
    })

    await Note.insertMany(sampleNotes)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Note.deleteMany()
    await Transaction.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
