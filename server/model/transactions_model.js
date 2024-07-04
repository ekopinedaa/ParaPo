const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const TransactionsSchema = new mongoose.Schema({
    transactionsid: {
        type: Number, // Change type to Number for auto-increment
        unique: true // Ensure transactionsid is unique
    },
    userid: {
        type: String,
        required: true
    },
    accountno: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactiontype: {
        type: String,
        required: true
    }
})

// Apply the auto-increment plugin to TransactionsSchema
TransactionsSchema.plugin(AutoIncrement, { inc_field: 'transactionsid' })

const TransactionsModel = mongoose.model('transactions', TransactionsSchema)
module.exports = TransactionsModel
