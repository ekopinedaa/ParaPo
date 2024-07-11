const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactions_controller')

//routes for transactions
router.put('/:ECID', TransactionsController.updateExtraCharge);
router.get('/getECID', TransactionsController.getExtraCharge)

module.exports = router;