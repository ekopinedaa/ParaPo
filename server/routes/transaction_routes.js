const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactions_controller')

//routes for transactions
router.put('/updateExtraCharge/:ECID', TransactionsController.updateExtraCharge);
router.get('/getECID/:ECID', TransactionsController.getExtraCharge);
router.post('/addExtraCharge', TransactionsController.addExtraCharge);
router.post('/createTransaction', TransactionsController.createTransaction);
router.get('/getTransactionById/:transactionsid', TransactionsController.getTransactionById);
router.get('/getAllTransactions', TransactionsController.getAllTransactions);


module.exports = router;