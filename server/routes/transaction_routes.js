const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactions_controller')

//routes for transactions
router.put('/updateExtraCharge/:ECID', TransactionsController.updateExtraCharge);
router.get('/getECID/:ECID', TransactionsController.getExtraCharge);
router.post('/addExtraCharge', TransactionsController.addExtraCharge);

module.exports = router;