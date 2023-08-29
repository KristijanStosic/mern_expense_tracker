const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsController')
const { protectedRoute, admin } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:transactionId/notes', noteRouter)

router
  .route('/')
  .get(protectedRoute, transactionsController.getUserTransactions)
  .post(protectedRoute, transactionsController.createNewTransaction)

router.get('/all-transactions', protectedRoute, admin, transactionsController.getAllTransactions)

router
  .route('/:id')
  .get(protectedRoute, transactionsController.getTransactionById)
  .patch(protectedRoute, transactionsController.updateTransaction)
  .delete(protectedRoute, admin, transactionsController.deleteTransaction)

module.exports = router